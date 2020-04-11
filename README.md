## Git使用
 - 开发新功能时，分支命名形如 `feature/xxx`，第一个commit message形如 `init xxx`
 - 修复问题时，分支命名形如 `fix/xxx`，commit message形如 `fix: 组件名/xxx`
 - 代码优化时，分支命名形如 `style/xxxx`，commit message形如 `style: 组件名/xxx`
 - 整理commit可使用 `git reset --soft commit-hash`
 - 拉取远程代码使用 git pull --rebase，rebase可以避免绝大多数冲突问题