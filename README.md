# anywhere README

## 安装依赖

可以使用 `antfu` 大佬的 `ni` 工具更方便的运行，下载方式

```bash
npm i -g @antfu/ni
```

使用该工具安装依赖请输入命令 `ni`，运行请输入 `nr`，后面会输出所有 `package.json` 中的脚本供你选择

## 开发环境

```bash
npm run dev
```

这会默认启动一个本地服务器，地址为 `http://localhost:3000`，并且使用 `nodemon` 监听文件变化，自动重启服务器
