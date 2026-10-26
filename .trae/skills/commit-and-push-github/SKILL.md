---
name: "commit-and-push-github"
description: "将项目 commit 并 push 到 GitHub 远程仓库 houyayue/24001010428-houyayue-gaojiwangye（SSH 公钥已配置）。当用户要求提交到 GitHub、推送到 GitHub、同步 GitHub 仓库时调用此 skill。"
---

# Commit and Push (GitHub)

将当前项目提交并推送到 GitHub 远程仓库。

## 远程仓库

- SSH 地址：`git@github.com:houyayue/24001010428-houyayue-gaojiwangye.git`
- 网页地址：`https://github.com/houyayue/24001010428-houyayue-gaojiwangye`
- 认证方式：SSH 公钥已设置，**必须使用 SSH 地址**（不要用 https 地址，否则会要求 token）

## 工作流程

1. 按项目规则（AGENTS.md），执行前先将本次提示词追加到 `hou_ya_yue_prompt.md`（含时间、模型、全文，只追加不覆盖）。

2. 检查当前 git 状态：
   ```
   git --no-pager status
   git --no-pager log --oneline -5
   git remote -v
   git branch --show-current
   ```

3. 确认名为 `github` 的远程是否已配置；若无则添加（`origin` 指向 Gitee，**不要覆盖 origin**）：
   ```
   git remote add github git@github.com:houyayue/24001010428-houyayue-gaojiwangye.git
   ```
   若 `github` 已存在但地址不对：`git remote set-url github git@github.com:houyayue/24001010428-houyayue-gaojiwangye.git`

4. 暂存文件（优先按名称逐个添加，避免误加敏感文件；确认无敏感文件时可 `git add .`）：
   ```
   git add <文件或目录>
   ```

5. 创建提交，提交信息用中文、简明概述本次变更（如 `添加第X章练习页面`、`更新课程内容`）：
   ```
   git commit -m "..."
   ```

6. 推送到 GitHub（分支名以第 2 步 `git branch --show-current` 结果为准，通常为 `master`）：
   ```
   git push -u github master
   ```

## 注意事项

- `origin` 指向 Gitee（`https://gitee.com/hou-yayue/gaojiwangye-0428-hyy.git`），保持不动；GitHub 一律用远程名 `github`
- 执行 git 命令时加 `--no-pager` 或设置 `$env:GIT_PAGER = "cat"`，防止分页器挂起终端
- push 被拒绝（远程有新提交）时，先 `git pull --rebase github master` 再 push
- 若提示 host key 验证失败，先执行 `ssh -T git@github.com` 信任主机（公钥已配置，成功会显示 GitHub 用户名问候）
- 不要提交敏感文件（.env、密钥、凭据等）
