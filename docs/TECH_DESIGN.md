# 中国结云展览 - 技术设计文档

## 一、技术架构概览

### 1.1 技术栈选型

#### 核心框架
- **Vue 3.4+**：渐进式JavaScript框架，采用组合式API（Composition API）
- **Vite 5.x**：新一代前端构建工具，开发体验优秀，HMR 极快
- **Vue Router 4.x**：Vue 官方路由管理器，支持 SPA 单页应用

#### 状态管理（可选）
- **Pinia 2.x**：Vue 官方推荐的状态管理库，轻量且类型友好
- 或直接使用 Vue 3 Composition API + Provide/Inject（项目规模较小时）

#### 3D 渲染
- **Three.js r150+**：强大的 WebGL 3D 库，社区活跃
- **GLTFLoader**：加载 GLTF/GLB 3D 模型
- **OrbitControls**：轨道控制器，实现相机旋转、缩放交互
- **DRACOLoader**（可选）：模型压缩，减小文件体积

#### 样式方案
- **SCSS**：CSS 预处理器，支持变量、嵌套、混入
- **CSS3**：现代 CSS 特性（Grid、Flexbox、变量、动画等）

#### 工具库
- **Axios**（可选）：HTTP 客户端，用于 API 请求
- **dayjs**（可选）：轻量级日期处理库
- **lodash-es**（按需引入）：工具函数库

---

## 二、项目目录结构

```
ChinaKnotExhibition/
├── public/                       # 静态资源（不经过webpack处理）
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── api/                      # API接口层
│   │   ├── request.js           # Axios实例配置
│   │   ├── index.js             # API统一导出
│   │   ├── home.js              # 首页相关API
│   │   ├── category.js          # 分类相关API
│   │   └── item.js              # 作品相关API
│   │
│   ├── assets/                   # 资源文件（会被webpack处理）
│   │   ├── images/              # 图片资源
│   │   │   ├── knots/           # 中国结作品图片
│   │   │   ├── bg/              # 背景图片
│   │   │   └── icons/           # 图标
│   │   ├── models/              # 3D模型文件（GLB/GLTF）
│   │   │   ├── art/             # 艺术结模型
│   │   │   ├── auspicious/      # 吉祥结模型
│   │   │   ├── decorative/      # 装饰结模型
│   │   │   └── practical/       # 实用结模型
│   │   └── fonts/               # 字体文件（可选）
│   │
│   ├── components/               # 公共组件
│   │   ├── KnotCard/            # 中国结卡片组件
│   │   │   ├── index.vue
│   │   │   └── knot-card.scss
│   │   ├── CategoryNav/         # 分类导航组件
│   │   │   └── index.vue
│   │   ├── KnotViewer3D/        # 3D查看器组件（核心）
│   │   │   ├── index.vue
│   │   │   ├── three-scene.js   # Three.js场景逻辑
│   │   │   └── viewer.scss
│   │   ├── LoadingSpinner/      # 加载动画组件
│   │   │   └── index.vue
│   │   └── EmptyState/          # 空状态组件
│   │       └── index.vue
│   │
│   ├── views/                    # 页面组件
│   │   ├── Home/                # 首页
│   │   │   ├── index.vue
│   │   │   ├── components/      # 首页私有组件
│   │   │   │   └── Banner.vue
│   │   │   └── home.scss
│   │   ├── Gallery/             # 展览页
│   │   │   ├── index.vue
│   │   │   └── gallery.scss
│   │   └── Detail/              # 详情页（可选，或作为弹窗组件）
│   │       ├── index.vue
│   │       └── detail.scss
│   │
│   ├── router/                   # 路由配置
│   │   └── index.js             # Vue Router配置
│   │
│   ├── store/                    # 状态管理（Pinia）
│   │   ├── index.js             # Store入口
│   │   └── modules/
│   │       ├── category.js      # 分类状态
│   │       └── knot.js          # 中国结作品状态
│   │
│   ├── styles/                   # 全局样式
│   │   ├── variables.scss       # SCSS变量（颜色、字号等）
│   │   ├── mixins.scss          # SCSS混入
│   │   ├── common.scss          # 公共样式
│   │   └── reset.scss           # 样式重置（normalize.css）
│   │
│   ├── utils/                    # 工具函数
│   │   ├── constants.js         # 常量定义
│   │   ├── validator.js         # 数据验证
│   │   ├── formatter.js         # 格式化工具
│   │   └── three-helpers.js     # Three.js辅助函数
│   │
│   ├── mock/                     # Mock数据（开发阶段）
│   │   ├── categories.js        # 分类数据
│   │   └── knots.js             # 中国结作品数据
│   │
│   ├── App.vue                   # 应用根组件
│   └── main.js                   # 应用入口
│
├── .env.development              # 开发环境变量
├── .env.production               # 生产环境变量
├── .eslintrc.js                  # ESLint配置
├── .gitignore                    # Git忽略文件
├── vite.config.js                # Vite配置
├── package.json                  # 项目依赖
└── README.md                     # 项目说明
```

---

## 三、数据模型设计

### 3.1 分类（Category）模型

```typescript
interface Category {
  id: string;              // 分类ID，如：'art', 'auspicious', 'decorative', 'practical'
  name: string;            // 分类名称，如：'艺术结'
  nameEn: string;          // 英文名称（可选）
  description: string;     // 分类描述
  icon: string;            // 分类图标URL
  order: number;           // 排序权重
  itemCount: number;       // 该分类下的作品数量
  coverImage: string;      // 分类封面图（可选）
}
```

**示例数据**：
```javascript
{
  id: 'art',
  name: '艺术结',
  nameEn: 'Artistic Knots',
  description: '以艺术欣赏为主，造型复杂精美',
  icon: '/static/images/icons/art.png',
  order: 1,
  itemCount: 6,
  coverImage: '/static/images/category/art-cover.jpg'
}
```

---

### 3.2 中国结作品（KnotItem）模型

```typescript
interface KnotItem {
  id: string;                // 作品唯一ID
  name: string;              // 中文名称，如：'双线结'
  nameEn: string;            // 英文名称（可选）
  categoryId: string;        // 所属分类ID
  categoryName: string;      // 所属分类名称

  // 图片资源
  thumbnail: string;         // 缩略图URL（用于列表展示）
  image: string;             // 高清大图URL（用于详情展示）
  images: string[];          // 多角度图片数组（可选）

  // 基本信息
  description: string;       // 简短描述（50-100字）
  detailedDescription: string; // 详细介绍（300-500字）

  // 文化内涵
  history: string;           // 历史渊源
  culturalMeaning: string;   // 文化寓意
  symbolism: string;         // 象征意义

  // 技术信息
  technique: string;         // 编织技法说明
  difficulty: number;        // 难度等级（1-5星）
  materials: string[];       // 所需材料列表
  tools: string[];           // 所需工具（可选）
  steps: Step[];             // 制作步骤（可选）

  // 关联信息
  relatedItemIds: string[];  // 相关作品ID数组
  tags: string[];            // 标签

  // 3D模型（可选）
  modelUrl: string;          // 3D模型文件URL
  hasModel: boolean;         // 是否有3D模型

  // 元数据
  viewCount: number;         // 浏览次数（可选）
  likeCount: number;         // 点赞数（可选）
  createdAt: string;         // 创建时间
  updatedAt: string;         // 更新时间
}

// 制作步骤
interface Step {
  order: number;             // 步骤序号
  title: string;             // 步骤标题
  description: string;       // 步骤说明
  image: string;             // 步骤示意图（可选）
}
```

**示例数据**：
```javascript
{
  id: 'knot_001',
  name: '双线结',
  nameEn: 'Double Connection Knot',
  categoryId: 'auspicious',
  categoryName: '吉祥结',

  thumbnail: '/static/images/knots/shuangxian-thumb.jpg',
  image: '/static/images/knots/shuangxian-large.jpg',
  images: [
    '/static/images/knots/shuangxian-1.jpg',
    '/static/images/knots/shuangxian-2.jpg'
  ],

  description: '双线结是中国结中最基础的结型之一，寓意好事成双、双喜临门。',
  detailedDescription: '双线结又称双钱结，因其形似两个古铜钱相叠而得名...',

  history: '双线结起源于唐代，在宫廷服饰中广泛使用...',
  culturalMeaning: '象征好事成双、财源广进，常用于婚庆喜事...',
  symbolism: '两个圆环相扣，寓意心心相印、永结同心',

  technique: '采用双线交叉编织法，需要掌握基本的穿绕技巧...',
  difficulty: 2,
  materials: ['5号线（红色）', '打火机', '剪刀'],
  tools: ['珠针', '泡沫板'],

  relatedItemIds: ['knot_002', 'knot_005'],
  tags: ['基础结', '吉祥', '喜庆'],

  hasModel: false,
  modelUrl: '',

  viewCount: 0,
  likeCount: 0,
  createdAt: '2025-12-13T10:00:00.000Z',
  updatedAt: '2025-12-13T10:00:00.000Z'
}
```

---

### 3.3 首页数据（HomeData）模型

```typescript
interface HomeData {
  banner: {
    title: string;           // 主标题
    subtitle: string;        // 副标题
    description: string;     // 描述文案
    backgroundImage: string; // 背景图
  };

  statistics: {              // 统计数据（可选）
    totalItems: number;      // 作品总数
    totalCategories: number; // 分类总数
    totalViews: number;      // 总浏览量
  };

  featuredItems: KnotItem[]; // 精选作品（可选）
}
```

---

## 四、路由设计

### 4.1 路由配置（Vue Router）

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '中国结云展览 - 首页'
    }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('@/views/Gallery/index.vue'),
    meta: {
      title: '展览大厅'
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/Detail/index.vue'),
    meta: {
      title: '作品详情'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      title: '页面未找到'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// 全局前置守卫（设置页面标题）
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '中国结云展览';
  next();
});

export default router;
```

### 4.2 路由跳转方案

#### 首页 → 展览页
```javascript
// Home.vue
import { useRouter } from 'vue-router';

const router = useRouter();

const goToGallery = () => {
  router.push('/gallery');
};
```

#### 展览页 → 详情页（方案一：独立页面路由）
```javascript
// Gallery.vue
const goToDetail = (itemId) => {
  router.push(`/detail/${itemId}`);
};
```

#### 展览页 → 详情页（方案二：弹窗组件，推荐）
```javascript
// Gallery.vue
const selectedItem = ref(null);
const showDetailModal = ref(false);

const openDetail = (item) => {
  selectedItem.value = item;
  showDetailModal.value = true;

  // 可选：更新 URL（不刷新页面）
  history.pushState(null, '', `/gallery?item=${item.id}`);
};

const closeDetail = () => {
  showDetailModal.value = false;
  selectedItem.value = null;

  // 恢复 URL
  history.pushState(null, '', '/gallery');
};
```

---

## 五、核心功能实现

### 5.1 数据获取流程

#### 方案一：Mock数据（开发阶段）
```javascript
// src/mock/knots.js
export const mockKnots = [
  {
    id: 'knot_001',
    name: '双线结',
    categoryId: 'auspicious',
    // ... 其他字段
  },
  // ... 更多数据
];

// src/api/item.js
import { mockKnots } from '@/mock/knots';

export const getKnotList = (categoryId) => {
  return Promise.resolve({
    code: 200,
    data: categoryId
      ? mockKnots.filter(item => item.categoryId === categoryId)
      : mockKnots
  });
};
```

#### 方案二：真实API（生产阶段）
```javascript
// src/api/request.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 200) {
      return res;
    } else {
      console.error('业务错误：', res.message);
      return Promise.reject(res);
    }
  },
  (error) => {
    console.error('网络错误：', error);
    return Promise.reject(error);
  }
);

export default instance;

// src/api/item.js
import request from './request';

export const getKnotList = (params) => {
  return request({
    url: '/items',
    method: 'GET',
    params
  });
};
```

---

### 5.2 状态管理（Pinia）

```javascript
// src/store/modules/knot.js
import { defineStore } from 'pinia';
import { getKnotList, getKnotDetail } from '@/api/item';

export const useKnotStore = defineStore('knot', {
  state: () => ({
    knotList: [],           // 作品列表
    currentCategory: 'art', // 当前选中分类
    selectedKnot: null,     // 当前查看的作品
    loading: false,
    error: null
  }),

  getters: {
    // 根据分类筛选作品
    filteredKnots: (state) => {
      if (!state.currentCategory) return state.knotList;
      return state.knotList.filter(
        item => item.categoryId === state.currentCategory
      );
    },

    // 获取相关作品
    relatedKnots: (state) => {
      if (!state.selectedKnot) return [];
      return state.knotList.filter(
        item => state.selectedKnot.relatedItemIds.includes(item.id)
      );
    }
  },

  actions: {
    // 获取作品列表
    async fetchKnotList(categoryId) {
      this.loading = true;
      this.error = null;
      try {
        const res = await getKnotList({ categoryId });
        this.knotList = res.data;
      } catch (error) {
        this.error = error.message;
        console.error('获取作品列表失败：', error);
      } finally {
        this.loading = false;
      }
    },

    // 设置当前分类
    setCurrentCategory(categoryId) {
      this.currentCategory = categoryId;
    },

    // 选中作品
    selectKnot(knot) {
      this.selectedKnot = knot;
    },

    // 清空选中
    clearSelection() {
      this.selectedKnot = null;
    }
  }
});
```

---

### 5.3 组件通信方案

#### 父子组件通信
```vue
<!-- 父组件：Gallery -->
<template>
  <CategoryNav
    :categories="categories"
    :active-id="activeCategory"
    @change="handleCategoryChange"
  />

  <KnotCard
    v-for="item in knotList"
    :key="item.id"
    :item="item"
    @click="handleCardClick(item)"
  />
</template>

<!-- 子组件：CategoryNav -->
<script setup>
const props = defineProps({
  categories: Array,
  activeId: String
});

const emit = defineEmits(['change']);

const handleClick = (categoryId) => {
  emit('change', categoryId);
};
</script>
```

#### 跨组件通信（使用Pinia）
```javascript
// 在任意组件中
import { useKnotStore } from '@/store/modules/knot';

const knotStore = useKnotStore();

// 读取状态
const currentKnot = knotStore.selectedKnot;

// 修改状态
knotStore.setCurrentCategory('auspicious');
```

---

### 5.4 图片懒加载实现

```vue
<template>
  <image
    :src="imageSrc"
    :lazy-load="true"
    mode="aspectFill"
    @load="handleImageLoad"
    @error="handleImageError"
  />
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: String
});

const imageSrc = ref(props.src || '/static/images/placeholder.png');
const loading = ref(true);

const handleImageLoad = () => {
  loading.value = false;
};

const handleImageError = () => {
  imageSrc.value = '/static/images/error.png';
  loading.value = false;
};
</script>
```

---

## 六、样式设计规范

### 6.1 设计变量（variables.scss）

```scss
// src/styles/variables.scss

/* 颜色变量 */
$primary-color: #C8102E;        // 中国红
$secondary-color: #D4AF37;      // 金色
$text-primary: #1C1C1C;         // 主文字色
$text-secondary: #666666;       // 次要文字色
$text-tertiary: #999999;        // 辅助文字色

$bg-primary: #FAF9F6;           // 主背景色（米白）
$bg-secondary: #FFFFFF;         // 次要背景色
$bg-mask: rgba(0, 0, 0, 0.6);   // 蒙层颜色

$border-color: #E5E5E5;         // 边框颜色
$divider-color: #F0F0F0;        // 分割线颜色

/* 字号（使用 rem，基准 16px） */
$font-size-xs: 0.75rem;         // 12px
$font-size-sm: 0.875rem;        // 14px
$font-size-base: 1rem;          // 16px
$font-size-lg: 1.125rem;        // 18px
$font-size-xl: 1.25rem;         // 20px
$font-size-xxl: 1.5rem;         // 24px
$font-size-title: 2rem;         // 32px

/* 间距（使用 rem） */
$spacing-xs: 0.5rem;            // 8px
$spacing-sm: 1rem;              // 16px
$spacing-base: 1.5rem;          // 24px
$spacing-lg: 2rem;              // 32px
$spacing-xl: 3rem;              // 48px
$spacing-xxl: 4rem;             // 64px

/* 圆角 */
$border-radius-sm: 4px;
$border-radius-base: 8px;
$border-radius-lg: 12px;
$border-radius-circle: 50%;

/* 阴影 */
$shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
$shadow-base: 0 4px 12px rgba(0, 0, 0, 0.12);
$shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16);

/* 动画时长 */
$duration-fast: 0.2s;
$duration-base: 0.3s;
$duration-slow: 0.5s;

/* Z-index 层级 */
$z-index-modal-backdrop: 1000;
$z-index-modal: 1010;
$z-index-toast: 2000;

/* 断点（响应式） */
$breakpoint-mobile: 768px;
$breakpoint-tablet: 1024px;
$breakpoint-desktop: 1280px;
```

---

### 6.2 公共样式类（common.scss）

```scss
// src/styles/common.scss
@import './variables.scss';

/* 全局容器 */
.container {
  width: 100%;
  min-height: 100vh;
  background-color: $bg-primary;
}

.page-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: $spacing-base;
}

/* 布局 */
.flex {
  display: flex;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

/* 文本 */
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-line-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 间距工具类 */
.p-base { padding: $spacing-base; }
.m-base { margin: $spacing-base; }
.mt-base { margin-top: $spacing-base; }
.mb-base { margin-bottom: $spacing-base; }

/* 响应式工具类 */
@media (max-width: $breakpoint-mobile) {
  .hide-mobile { display: none !important; }
}

@media (min-width: $breakpoint-tablet) {
  .hide-desktop { display: none !important; }
}
```

---

## 七、性能优化策略

### 7.1 图片优化
- 使用WebP格式（支持的平台）
- 提供不同尺寸的图片（缩略图/大图）
- 启用懒加载（lazy-load）
- 压缩图片质量（推荐80%）

### 7.2 代码优化
- 按需引入组件和工具库
- 使用虚拟列表（长列表场景）
- 防抖节流（搜索、滚动事件）
- 路由懒加载

### 7.3 网络优化
- 接口数据缓存
- 请求去重
- 并发请求控制
- 离线缓存（本地存储）

### 7.4 渲染优化
- v-show vs v-if 合理选择
- 避免深层嵌套
- 使用key优化列表渲染
- 合理使用computed和watch

---

## 八、兼容性处理

### 8.1 条件编译

```vue
<!-- H5平台特定代码 -->
<!-- #ifdef H5 -->
<view class="h5-only">H5独有内容</view>
<!-- #endif -->

<!-- 微信小程序特定代码 -->
<!-- #ifdef MP-WEIXIN -->
<button open-type="share">分享</button>
<!-- #endif -->

<!-- 非H5平台 -->
<!-- #ifndef H5 -->
<view class="app-only">App独有内容</view>
<!-- #endif -->
```

### 8.2 浏览器特性检测

```javascript
// 检测 WebGL 支持
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

// 使用示例
if (!checkWebGLSupport()) {
  alert('您的浏览器不支持 WebGL，请升级浏览器或使用 Chrome/Firefox');
}

// 检测移动设备
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 检测触摸支持
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
```

---

## 九、安全性考虑

### 9.1 数据验证
- 前端参数校验
- 后端数据格式验证
- XSS防护（富文本内容）

### 9.2 错误处理
```javascript
// 全局错误处理
const handleError = (error) => {
  console.error('Error:', error);
  uni.showToast({
    title: '操作失败，请稍后重试',
    icon: 'none'
  });
};

// 请求错误处理
try {
  const res = await getKnotList();
} catch (error) {
  handleError(error);
}
```

---

## 十、测试策略

### 10.1 单元测试
- 工具函数测试
- 数据模型验证测试

### 10.2 功能测试
- 页面跳转流程
- 分类筛选功能
- 详情展示功能
- 图片加载测试

### 10.3 兼容性测试
- H5浏览器测试（Chrome、Safari、Firefox）
- 微信小程序测试
- 不同屏幕尺寸测试
- iOS/Android真机测试

### 10.4 性能测试
- 页面加载时间
- 图片加载性能
- 滚动流畅度
- 内存占用

---

## 十一、部署方案

### 11.1 构建生产版本
```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 构建产物在 dist/ 目录
```

### 11.2 Vite 配置（vite.config.js）
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: './', // 相对路径，便于部署到子目录
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks: {
          'three': ['three'],
          'vue-vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    },
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

### 11.3 部署到静态服务器

#### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/china-knot-exhibition/dist;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # GLB/GLTF 模型文件 MIME 类型
    location ~* \.(glb|gltf)$ {
        types {
            model/gltf-binary glb;
            model/gltf+json gltf;
        }
        expires 1y;
        add_header Cache-Control "public";
    }
}
```

### 11.4 部署到 CDN
- 将 `dist/` 目录上传到 OSS（阿里云、腾讯云、七牛云等）
- 配置 CDN 加速
- 设置正确的 MIME 类型（特别是 .glb/.gltf 模型文件）

### 11.5 环境变量配置

#### .env.development
```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

#### .env.production
```
VITE_API_BASE_URL=https://api.your-domain.com/api/v1
```

---

## 十二、技术难点与解决方案

### 12.1 3D模型展示性能优化
**难点**：3D 模型在低端设备上渲染性能不佳
**解决方案**：
- 模型面数控制在 5000 面以内
- 使用 Draco 压缩减小文件体积
- 实现 LOD（细节层次）技术
- 使用 Web Worker 加载模型
- 降低纹理分辨率（1024x1024）
- 限制阴影质量和渲染范围

### 12.2 移动端触摸交互
**难点**：移动端触摸手势识别不准确
**解决方案**：
- 使用 OrbitControls 的移动端支持
- 配置合适的 `rotateSpeed`、`zoomSpeed`
- 添加触摸手势防抖
- 提供明确的操作提示

### 12.3 大量图片和模型加载
**难点**：首次加载时间过长，影响用户体验
**解决方案**：
- 图片懒加载（Intersection Observer API）
- 模型按需加载（点击详情时才加载）
- 使用 CDN 加速静态资源
- WebP 格式图片（现代浏览器）
- 显示加载进度条
- 实现预加载策略（后台加载下一个）

### 12.4 浏览器兼容性
**难点**：旧版浏览器不支持 WebGL 2.0
**解决方案**：
- 检测 WebGL 支持情况
- 不支持时降级为高清图片展示
- 提供浏览器升级提示
- 使用 Babel 转译 ES6+ 语法
- Polyfill 兼容旧浏览器 API

---

**文档版本**：v1.1（更新为纯 Web 端技术栈）
**编写日期**：2025-12-13
**更新日期**：2025-12-13
**平台**：Web（H5）
**技术栈**：Vue 3 + Vite + Three.js
