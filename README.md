# anywhere README

## 目录结构

本项目分为三个部分，`backend` 和 `frontend` 以及 `docs`，分别对应后端和前端代码还有文档

其中在项目根目录下有一个 `package.json` 文件，用于管理整个项目的开发环境依赖（比如后面提到的提交前自动格式化），注意不包含生产环境依赖。

而在 `frontend` 和 `backend` 目录下也有各自的 `package.json` 文件，用于管理各自的依赖，这些依赖会被安装到各自的目录下

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

### 提交前自动格式化

通过使用 `husky` 和 `lint-staged` 实现每次提交前自动使用 `prettier` 进行代码格式化，会格式化所有 `prettier` 能够识别的文件
