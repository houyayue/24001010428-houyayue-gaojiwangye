# Commit and Push

将当前项目提交并推送到 Gitee 远程仓库。

## 远程仓库

https://gitee.com/hou-yayue/gaojiwangye-0428-hyy.git

## 工作流程

1. 检查当前 git 状态（`git status`、`git log --oneline -5`、`git remote -v`）
2. 如果尚未配置远程仓库，执行：`git remote add origin https://gitee.com/hou-yayue/gaojiwangye-0428-hyy.git`
3. 暂存所有文件：`git add .`
4. 创建提交，使用清晰的中文提交信息描述本次变更：`git commit -m "..."`
5. 推送到远程：`git push -u origin master`

## 注意事项

- 提交信息使用中文，格式：`更新课程内容` 或 `添加第X章练习页面`
- 如果 push 被拒绝（远程有更新），先 `git pull --rebase origin master` 再 push
- 首次推送使用 `-u origin master` 建立跟踪关系
