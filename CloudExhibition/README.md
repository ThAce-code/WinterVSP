# 中国结云展览

> 基于 Vue 3 + Vite + Three.js 的在线展览平台

## 项目简介

中国结云展览是一个展示中国传统文化艺术的在线平台，通过 3D 技术让用户可以全方位欣赏精美的中国结作品。

## 技术栈

- **前端框架**: Vue 3.4+ (Composition API)
- **构建工具**: Vite 5.x
- **路由管理**: Vue Router 4.x
- **状态管理**: Pinia 2.x
- **3D 渲染**: Three.js r160
- **HTTP 客户端**: Axios
- **样式**: SCSS + CSS3

## 项目结构

```
CloudExhibition/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口
│   ├── assets/            # 资源文件（图片、3D模型）
│   ├── components/        # 公共组件
│   ├── views/             # 页面组件
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   ├── mock/              # Mock 数据
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── vite.config.js         # Vite 配置
├── package.json           # 依赖配置
└── README.md             # 项目说明
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动

### 生产构建

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 功能特性

- ✅ 首页展示
- ✅ 展览大厅（作品列表）
- ✅ 分类筛选
- 🚧 3D 详情查看器（开发中）
- 🚧 作品详细信息展示（开发中）

## 开发文档

详细的开发文档请查看 `docs/` 目录：
- [产品需求文档 (PRD.md)](../docs/PRD.md)
- [技术设计文档 (TECH_DESIGN.md)](../docs/TECH_DESIGN.md)
- [API 文档 (API.md)](../docs/API.md)
- [开发规范 (DEV_GUIDE.md)](../docs/DEV_GUIDE.md)

## License

MIT
