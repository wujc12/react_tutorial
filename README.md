# React 官方教程 function + React Hooks 版本

官方教程地址：https://react.docschina.org/tutorial/tutorial.html#before-we-start-the-tutorial

## 概述

官方教程使用的是 ``class`` 配合 ``state`` 和 ``props`` 进行编写的。随着 React Hooks 的发布，实际生产中更多使用 function + React Hooks 的形式进行组件的编写，因此本教程在 React 官方教程的基础上，利用 function 和 React Hooks 进行了实现。

## 运行方式

```shell script
# 首先将项目克隆到本地
git clone https://github.com/wujc12/react_tutorial.git

# 进入到项目文件夹跟路径下
cd react_tutorial

# 安装所需依赖
yarn install
# 运行项目
yarn start
```

## 后续优化
- [] 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
- [] 在历史记录列表中加粗显示当前选择的项目。
- [] 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
- [] 添加一个可以升序或降序显示历史记录的按钮。
- [] 每当有人获胜时，高亮显示连成一线的 3 颗棋子。
- [] 当无人获胜时，显示一个平局的消息。

