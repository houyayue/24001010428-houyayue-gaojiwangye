---
name: "commit-and-push-github"
description: "将项目 commit 并 push 到 GitHub 远程仓库 houyayue/24001010428-houyayue-gaojiwangye。当用户要求提交到 GitHub、推送到 GitHub、同步 GitHub 仓库时调用此 skill。"
---

# Commit and Push (GitHub)

将当前项目提交并推送到 GitHub 远程仓库。

## 远程仓库现状（2026-10-27 更新）

- `origin` 已指向 GitHub：`https://github.com/houyayue/24001010428-houyayue-gaojiwangye.git`（用户自行配置，**优先用它**）
- 网页地址：`https://github.com/houyayue/24001010428-houyayue-gaojiwangye`
- 认证：Windows Git Credential Manager 已缓存 GitHub 凭据，https 推送免交互

## 推送通道选择（重要，2026-10-27 实测）

本机到 GitHub 的连通性不稳定，按以下顺序尝试：

1. **首选：HTTPS + schannel**（实测可用，无需代理）：
   ```
   git -c http.sslBackend=schannel push -u origin master
   ```
   默认 OpenSSL 后端会报 `SSL certificate ... unable to get local issuer certificate (20)`，加 `-c http.sslBackend=schannel` 改用 Windows 系统证书库即可解决。
2. 备选：SSH 443 通道 `git@ssh.github.com:443`（公钥已配置，但 2026-10-27 实测连接超时；22 端口 banner exchange 被 Connection refused，不可用）。仅当 https 也不通且网络恢复时使用：
   ```
   ssh -T -p 443 -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 git@ssh.github.com
   ```
3. 都不通时：检查本地代理端口（7890/7897/10809/1080）是否存在，可配置 `git -c http.proxy=http://127.0.0.1:<端口>` 后再推；否则如实报告用户网络问题。

## 工作流程

1. 按项目规则（AGENTS.md），执行前先将本次提示词追加到 `hou_ya_yue_prompt.md`（含时间、模型、全文，只追加不覆盖）。

2. 检查当前 git 状态：
   ```
   git --no-pager status
   git --no-pager log --oneline -5
   git remote -v
   git branch --show-current
   ```

3. 暂存文件（优先按名称逐个添加，避免误加敏感文件；确认无敏感文件时可 `git add .`）：
   ```
   git add <文件或目录>
   ```

4. 创建提交，提交信息用中文、简明概述本次变更（如 `添加第X章练习页面`、`更新课程内容`）：
   ```
   git commit -m "..."
   ```

5. 推送到 GitHub（分支名以第 2 步结果为准，通常为 `master`）：
   ```
   git -c http.sslBackend=schannel push -u origin master
   ```

## 注意事项

- 执行 git 命令时加 `--no-pager` 或设置 `$env:GIT_PAGER = "cat"`，防止分页器挂起终端
- **push 被拒 (fetch first)**：先 `git -c http.sslBackend=schannel fetch origin` 查看远程历史
  - 若只是远程有新提交：`git pull --rebase origin master` 后重推
  - 若本地仓库被重建过、历史分叉（远程仍是旧历史、本地是全新历史）：**不要 force push**。用零丢失方案整合：
    ```
    git reset --soft origin/master    # 分支指到远程头，工作区/暂存区内容不动
    git commit -m "同步项目最新版本：..."   # 当前全部内容作为一个新提交
    git -c http.sslBackend=schannel push -u origin master   # fast-forward，无需 force
    ```
- 不要提交敏感文件（.env、密钥、凭据等）
