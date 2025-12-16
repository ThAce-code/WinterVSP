# 中国结云展览 - 开发规范文档

## 一、代码规范

### 1.1 JavaScript/Vue 3 编码规范

#### 基本规则
- 使用 **ES6+** 语法
- 使用 **组合式 API (Composition API)**，避免使用选项式 API
- 使用 **单引号** 而非双引号（字符串）
- 使用 **2 个空格** 缩进
- 每行代码不超过 **120 个字符**
- 文件末尾保留一个空行

#### 示例代码
```vue
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useKnotStore } from '@/store/modules/knot';

// Props 定义
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  showDetail: {
    type: Boolean,
    default: false
  }
});

// Emits 定义
const emit = defineEmits(['click', 'update:showDetail']);

// 响应式数据
const loading = ref(false);
const imageLoaded = ref(false);

// 计算属性
const displayName = computed(() => {
  return props.item.name || '未命名';
});

// 方法
const handleClick = () => {
  emit('click', props.item);
};

// 生命周期
onMounted(() => {
  console.log('组件已挂载');
});
</script>
```

---

### 1.2 命名规范

#### 文件命名
- **Vue 组件文件**: 使用 **PascalCase**（大驼峰）
  ```
  KnotCard.vue
  CategoryNav.vue
  LoadingSpinner.vue
  ```

- **JavaScript 文件**: 使用 **camelCase**（小驼峰）或 **kebab-case**（短横线）
  ```
  request.js
  knot-utils.js
  formatter.js
  ```

- **样式文件**: 使用 **kebab-case**
  ```
  common.scss
  variables.scss
  knot-card.scss
  ```

#### 变量命名
```javascript
// 常量：全大写 + 下划线
const BASE_URL = 'https://api.chinaknot.com';
const MAX_PAGE_SIZE = 100;

// 变量：小驼峰
const knotList = [];
const currentCategory = 'art';

// 布尔值：is/has/can 前缀
const isLoading = false;
const hasError = false;
const canEdit = true;

// 函数：动词开头 + 小驼峰
function getKnotList() {}
function handleClick() {}
function fetchData() {}

// 私有变量/方法：下划线前缀
const _privateVar = 'private';
function _privateMethod() {}
```

#### 组件命名
```javascript
// 组件名：PascalCase
const KnotCard = defineComponent({ /* ... */ });

// 组件使用：PascalCase 或 kebab-case
<KnotCard :item="knot" />
<knot-card :item="knot" />
```

---

### 1.3 Vue 组件结构规范

#### 组件文件结构顺序
```vue
<!-- 1. 模板 -->
<template>
  <view class="knot-card">
    <!-- 内容 -->
  </view>
</template>

<!-- 2. 脚本 -->
<script setup>
// 2.1 导入
import { ref } from 'vue';

// 2.2 Props & Emits
const props = defineProps({ /* ... */ });
const emit = defineEmits(['click']);

// 2.3 响应式数据
const loading = ref(false);

// 2.4 计算属性
const displayName = computed(() => { /* ... */ });

// 2.5 方法
const handleClick = () => { /* ... */ };

// 2.6 生命周期
onMounted(() => { /* ... */ });

// 2.7 监听器
watch(() => props.item, (newVal) => { /* ... */ });
</script>

<!-- 3. 样式 -->
<style lang="scss" scoped>
.knot-card {
  // 样式
}
</style>
```

#### Props 定义规范
```javascript
// ✅ 推荐：完整的 Props 定义
const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.id && value.name;
    }
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => {
      return ['small', 'medium', 'large'].includes(value);
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// ❌ 不推荐：简单数组形式
const props = defineProps(['item', 'size', 'disabled']);
```

---

### 1.4 样式规范

#### SCSS 书写规范
```scss
// 使用嵌套，但不要超过 3 层
.knot-card {
  padding: $spacing-base;
  background: $bg-secondary;

  &__header {
    display: flex;
    align-items: center;

    .title {
      font-size: $font-size-lg;
      color: $text-primary;
    }
  }

  &__body {
    margin-top: $spacing-sm;
  }

  // 状态类
  &.is-active {
    border-color: $primary-color;
  }

  // 响应式（使用 rpx）
  @media (max-width: 750rpx) {
    padding: $spacing-sm;
  }
}
```

#### BEM 命名规范
```scss
// Block__Element--Modifier
.category-nav { }              // Block（块）
.category-nav__item { }        // Element（元素）
.category-nav__item--active { } // Modifier（修饰符）

// 示例
<view class="category-nav">
  <view class="category-nav__item category-nav__item--active">艺术结</view>
  <view class="category-nav__item">吉祥结</view>
</view>
```

#### 使用全局变量
```scss
// 使用 uni.scss 中定义的变量
.knot-card {
  padding: $spacing-base;          // 而非 24rpx
  color: $text-primary;            // 而非 #1C1C1C
  background-color: $bg-secondary; // 而非 #FFFFFF
  border-radius: $border-radius-base;
}
```

---

## 二、项目结构规范

### 2.1 目录组织原则

#### 按功能模块组织（推荐）
```
src/
├── api/              # API 接口层
│   ├── modules/      # 按业务模块划分
│   │   ├── home.js
│   │   ├── category.js
│   │   └── item.js
│   ├── request.js    # 请求封装
│   └── index.js      # 统一导出
│
├── components/       # 公共组件
│   ├── KnotCard/     # 每个组件一个文件夹
│   │   ├── index.vue
│   │   └── knot-card.scss (可选)
│   └── CategoryNav/
│       └── index.vue
│
├── pages/            # 页面
│   ├── home/
│   │   ├── index.vue
│   │   └── components/  # 页面私有组件
│   │       └── Banner.vue
│   └── gallery/
│       └── index.vue
```

---

### 2.2 文件导入顺序

```javascript
// 1. Vue 核心
import { ref, computed, onMounted } from 'vue';

// 2. 第三方库
import dayjs from 'dayjs';

// 3. Store
import { useKnotStore } from '@/store/modules/knot';

// 4. API
import { getKnotList } from '@/api/item';

// 5. 组件
import KnotCard from '@/components/KnotCard/index.vue';

// 6. 工具函数
import { formatDate } from '@/utils/formatter';

// 7. 常量
import { CATEGORIES } from '@/utils/constants';

// 8. 样式（如需单独导入）
import '@/styles/common.scss';
```

---

## 三、Git 提交规范

### 3.1 分支管理

#### 分支命名
```
main          # 主分支（生产环境）
develop       # 开发分支
feature/xxx   # 功能分支
fix/xxx       # 修复分支
hotfix/xxx    # 紧急修复
release/xxx   # 发布分支
```

#### 分支使用流程
```bash
# 1. 从 develop 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/knot-detail

# 2. 开发完成后合并回 develop
git checkout develop
git merge feature/knot-detail
git push origin develop

# 3. 删除功能分支
git branch -d feature/knot-detail
```

---

### 3.2 Commit 规范

#### Commit Message 格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 类型
| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | 修复 Bug |
| docs | 文档更新 |
| style | 代码格式调整（不影响功能） |
| refactor | 重构（既不是新功能也不是修复） |
| perf | 性能优化 |
| test | 测试相关 |
| chore | 构建/工具/依赖更新 |
| revert | 回滚 |

#### Commit 示例
```bash
# 好的提交示例
git commit -m "feat(gallery): 添加分类筛选功能"
git commit -m "fix(detail): 修复详情页图片加载失败问题"
git commit -m "docs(api): 更新 API 文档"
git commit -m "style(home): 调整首页标题字体大小"
git commit -m "refactor(store): 重构 knot store 结构"
git commit -m "perf(gallery): 优化作品列表渲染性能"

# 不好的提交示例（避免）
git commit -m "修改"
git commit -m "update"
git commit -m "fix bug"
git commit -m "aaa"
```

#### 详细的 Commit Message
```bash
git commit -m "feat(detail): 添加3D模型查看功能

- 引入 Three.js 库
- 实现 3D 模型加载和渲染
- 添加旋转、缩放交互
- 仅在 H5 平台启用

Closes #123"
```

---

### 3.3 代码提交前检查清单

- [ ] 代码已通过本地测试
- [ ] 代码格式符合规范
- [ ] 没有 console.log 调试代码（除非必要）
- [ ] 没有注释掉的无用代码
- [ ] 没有提交敏感信息（密钥、密码等）
- [ ] Commit Message 符合规范

---

## 四、注释规范

### 4.1 文件头注释

```javascript
/**
 * @file 中国结作品 API
 * @description 提供中国结作品的增删改查接口
 * @author 开发团队
 * @date 2025-12-13
 */
```

---

### 4.2 函数注释

```javascript
/**
 * 获取中国结作品列表
 * @param {Object} params - 查询参数
 * @param {string} params.categoryId - 分类ID
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @returns {Promise<Object>} 作品列表数据
 * @throws {Error} 网络请求失败时抛出错误
 */
export async function getKnotList(params) {
  try {
    const res = await request({
      url: '/items',
      method: 'GET',
      data: params
    });
    return res.data;
  } catch (error) {
    console.error('获取作品列表失败：', error);
    throw error;
  }
}
```

---

### 4.3 复杂逻辑注释

```javascript
// 根据分类ID筛选作品
// 如果没有指定分类，则返回所有作品
const filteredKnots = computed(() => {
  if (!currentCategory.value) {
    return knotList.value;
  }

  // 过滤出当前分类下的作品
  return knotList.value.filter(item => {
    return item.categoryId === currentCategory.value;
  });
});
```

---

### 4.4 TODO 注释

```javascript
// TODO: 实现3D模型加载功能
// FIXME: 修复图片懒加载在小程序中的兼容性问题
// HACK: 临时方案，需要后续优化
// NOTE: 注意这里的性能问题
// OPTIMIZE: 可以优化的地方
```

---

## 五、API 调用规范

### 5.1 统一错误处理

```javascript
// src/api/request.js
export const request = (config) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + config.url,
      method: config.method || 'GET',
      data: config.data,
      header: {
        'Content-Type': 'application/json',
        ...config.header
      },
      success: (res) => {
        // 统一处理业务错误
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data);
          } else {
            // 业务错误
            handleBusinessError(res.data);
            reject(res.data);
          }
        } else {
          // HTTP 错误
          handleHttpError(res);
          reject(res);
        }
      },
      fail: (error) => {
        // 网络错误
        handleNetworkError(error);
        reject(error);
      }
    });
  });
};

// 业务错误处理
function handleBusinessError(data) {
  uni.showToast({
    title: data.message || '操作失败',
    icon: 'none'
  });
}

// HTTP 错误处理
function handleHttpError(res) {
  const errorMsg = {
    400: '请求参数错误',
    401: '未授权，请登录',
    403: '拒绝访问',
    404: '请求的资源不存在',
    500: '服务器错误'
  };

  uni.showToast({
    title: errorMsg[res.statusCode] || '请求失败',
    icon: 'none'
  });
}

// 网络错误处理
function handleNetworkError(error) {
  uni.showToast({
    title: '网络连接失败，请检查网络',
    icon: 'none'
  });
}
```

---

### 5.2 Loading 状态管理

```javascript
// 页面中使用
const loading = ref(false);

async function fetchData() {
  loading.value = true;

  try {
    const res = await getKnotList({ categoryId: 'art' });
    knotList.value = res.data.items;
  } catch (error) {
    console.error('获取数据失败：', error);
  } finally {
    loading.value = false;
  }
}
```

---

### 5.3 并发请求处理

```javascript
// ✅ 推荐：使用 Promise.all
async function fetchHomeData() {
  loading.value = true;

  try {
    const [categoriesRes, featuredRes, statsRes] = await Promise.all([
      getCategories(),
      getFeaturedItems({ limit: 6 }),
      getStatistics()
    ]);

    categories.value = categoriesRes.data;
    featuredItems.value = featuredRes.data;
    statistics.value = statsRes.data;
  } catch (error) {
    console.error('获取首页数据失败：', error);
  } finally {
    loading.value = false;
  }
}

// ❌ 不推荐：串行请求
async function fetchHomeDataBad() {
  const categoriesRes = await getCategories();
  const featuredRes = await getFeaturedItems();
  const statsRes = await getStatistics();
  // 这样会导致请求依次执行，耗时更长
}
```

---

## 六、组件开发规范

### 6.1 组件设计原则

#### 单一职责原则
每个组件只负责一个功能

```vue
<!-- ✅ 好的设计：职责单一 -->
<KnotCard :item="knot" @click="handleClick" />

<!-- ❌ 不好的设计：职责过多 -->
<KnotCardWithDetailAndEditAndDelete :item="knot" />
```

#### Props 向下，Events 向上
```vue
<!-- 父组件 -->
<template>
  <KnotCard
    :item="knot"          <!-- Props 向下传递 -->
    @click="handleClick"  <!-- Events 向上触发 -->
  />
</template>

<!-- 子组件 KnotCard -->
<script setup>
const props = defineProps({
  item: Object
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.item);
};
</script>
```

---

### 6.2 组件通信方式

#### 1. Props & Emits（父子组件）
```vue
<!-- 父组件 -->
<ChildComponent
  :message="parentMessage"
  @update="handleUpdate"
/>

<!-- 子组件 -->
<script setup>
const props = defineProps({
  message: String
});

const emit = defineEmits(['update']);

const handleUpdate = () => {
  emit('update', 'new value');
};
</script>
```

#### 2. v-model（双向绑定）
```vue
<!-- 父组件 -->
<CustomInput v-model="inputValue" />

<!-- 子组件 -->
<script setup>
const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (e) => {
  emit('update:modelValue', e.target.value);
};
</script>

<template>
  <input
    :value="modelValue"
    @input="handleInput"
  />
</template>
```

#### 3. Provide / Inject（跨层级）
```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue';

const theme = ref('light');
provide('theme', theme);
</script>

<!-- 后代组件 -->
<script setup>
import { inject } from 'vue';

const theme = inject('theme');
</script>
```

#### 4. Pinia Store（全局状态）
```javascript
// 任意组件
import { useKnotStore } from '@/store/modules/knot';

const knotStore = useKnotStore();

// 读取状态
const knotList = knotStore.knotList;

// 修改状态
knotStore.setCurrentCategory('art');
```

---

### 6.3 组件性能优化

#### 使用 v-show vs v-if
```vue
<!-- 频繁切换：使用 v-show -->
<view v-show="isVisible" class="modal">
  <!-- 内容 -->
</view>

<!-- 条件很少改变：使用 v-if -->
<view v-if="hasPermission" class="admin-panel">
  <!-- 内容 -->
</view>
```

#### 列表渲染优化
```vue
<!-- ✅ 使用唯一的 key -->
<view
  v-for="item in knotList"
  :key="item.id"
  class="knot-item"
>
  {{ item.name }}
</view>

<!-- ❌ 使用 index 作为 key（不推荐） -->
<view
  v-for="(item, index) in knotList"
  :key="index"
  class="knot-item"
>
  {{ item.name }}
</view>
```

#### 计算属性 vs 方法
```vue
<script setup>
import { computed } from 'vue';

// ✅ 使用 computed（有缓存）
const filteredKnots = computed(() => {
  return knotList.value.filter(item => item.categoryId === 'art');
});

// ❌ 使用方法（每次都重新计算）
function getFilteredKnots() {
  return knotList.value.filter(item => item.categoryId === 'art');
}
</script>

<template>
  <!-- ✅ 推荐 -->
  <view v-for="item in filteredKnots" :key="item.id">
    {{ item.name }}
  </view>

  <!-- ❌ 不推荐 -->
  <view v-for="item in getFilteredKnots()" :key="item.id">
    {{ item.name }}
  </view>
</template>
```

---

## 七、测试规范

### 7.1 测试层级

#### 单元测试
测试单个函数或组件
```javascript
// utils/formatter.test.js
import { formatDate } from './formatter';

describe('formatDate', () => {
  it('应该正确格式化日期', () => {
    const date = '2025-12-13T10:00:00.000Z';
    const result = formatDate(date, 'YYYY-MM-DD');
    expect(result).toBe('2025-12-13');
  });
});
```

#### 集成测试
测试多个模块协作
```javascript
// pages/gallery/index.test.js
describe('Gallery 页面', () => {
  it('应该正确显示作品列表', async () => {
    const wrapper = mount(GalleryPage);
    await wrapper.vm.fetchKnotList();
    expect(wrapper.findAll('.knot-card').length).toBeGreaterThan(0);
  });
});
```

#### E2E 测试（端到端）
测试完整用户流程
```javascript
describe('用户浏览流程', () => {
  it('从首页到详情页', () => {
    // 访问首页
    cy.visit('/pages/home/index');

    // 点击进入展览
    cy.contains('进入展览').click();

    // 应该跳转到展览页
    cy.url().should('include', '/pages/gallery/index');

    // 点击第一个作品
    cy.get('.knot-card').first().click();

    // 应该显示详情弹窗
    cy.get('.knot-detail').should('be.visible');
  });
});
```

---

### 7.2 测试覆盖目标

- **工具函数**：100% 覆盖
- **API 层**：80% 覆盖
- **组件**：70% 覆盖
- **页面**：60% 覆盖

---

## 八、性能优化规范

### 8.1 图片优化

```vue
<script setup>
// 使用缩略图 + 大图
const imageSrc = computed(() => {
  return props.useThumb ? props.item.thumbnail : props.item.image;
});
</script>

<template>
  <!-- 启用懒加载 -->
  <image
    :src="imageSrc"
    :lazy-load="true"
    mode="aspectFill"
    @load="handleImageLoad"
    @error="handleImageError"
  />
</template>
```

---

### 8.2 防抖与节流

```javascript
import { ref } from 'vue';

// 防抖：延迟执行
let debounceTimer = null;
function debounce(fn, delay = 300) {
  return function(...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用示例：搜索输入
const handleSearch = debounce((keyword) => {
  console.log('搜索：', keyword);
  // 执行搜索逻辑
}, 500);

// 节流：限制执行频率
let throttleTimer = null;
function throttle(fn, delay = 300) {
  return function(...args) {
    if (throttleTimer) return;

    throttleTimer = setTimeout(() => {
      fn.apply(this, args);
      throttleTimer = null;
    }, delay);
  };
}

// 使用示例：滚动事件
const handleScroll = throttle(() => {
  console.log('滚动中...');
  // 执行滚动逻辑
}, 200);
```

---

### 8.3 长列表优化（虚拟列表）

```vue
<!-- 使用 uni-app 的虚拟列表（仅支持部分平台） -->
<recycle-view>
  <recycle-item
    v-for="item in knotList"
    :key="item.id"
  >
    <KnotCard :item="item" />
  </recycle-item>
</recycle-view>

<!-- 或使用分页加载 -->
<scroll-view
  scroll-y
  @scrolltolower="loadMore"
>
  <KnotCard
    v-for="item in knotList"
    :key="item.id"
    :item="item"
  />

  <view v-if="hasMore" class="loading">
    加载中...
  </view>
</scroll-view>
```

---

## 九、错误处理规范

### 9.1 全局错误处理

```javascript
// main.js
import { createSSRApp } from 'vue';

export function createApp() {
  const app = createSSRApp(App);

  // 全局错误处理
  app.config.errorHandler = (err, instance, info) => {
    console.error('全局错误：', err);
    console.error('错误信息：', info);

    // 上报错误（可选）
    reportError({
      message: err.message,
      stack: err.stack,
      info
    });
  };

  return { app };
}
```

---

### 9.2 Try-Catch 使用

```javascript
// ✅ 推荐：捕获具体错误
async function fetchData() {
  try {
    const res = await getKnotList();
    knotList.value = res.data.items;
  } catch (error) {
    if (error.code === 10002) {
      // 处理特定错误
      console.error('作品不存在');
    } else {
      // 处理其他错误
      console.error('未知错误：', error);
    }

    // 显示用户友好的错误提示
    uni.showToast({
      title: '获取数据失败，请稍后重试',
      icon: 'none'
    });
  }
}

// ❌ 不推荐：空的 catch
async function fetchDataBad() {
  try {
    const res = await getKnotList();
  } catch (error) {
    // 什么都不做（吞掉错误）
  }
}
```

---

## 十、代码审查（Code Review）规范

### 10.1 审查清单

#### 功能性
- [ ] 代码实现是否符合需求
- [ ] 逻辑是否正确
- [ ] 边界情况是否处理

#### 代码质量
- [ ] 代码是否易读易懂
- [ ] 命名是否规范
- [ ] 是否有重复代码
- [ ] 注释是否充分

#### 性能
- [ ] 是否有性能问题
- [ ] 是否有内存泄漏
- [ ] 图片是否优化

#### 安全性
- [ ] 是否有安全隐患
- [ ] 用户输入是否验证
- [ ] 敏感信息是否泄露

#### 测试
- [ ] 是否有单元测试
- [ ] 测试覆盖率是否达标

---

### 10.2 审查建议格式

```
【类型】位置：建议内容

【优化】src/pages/gallery/index.vue:45
建议使用 computed 替代 method，提升性能

【问题】src/api/item.js:23
缺少错误处理，建议添加 try-catch

【风格】src/components/KnotCard/index.vue:12
变量命名建议使用小驼峰：knotItem → item
```

---

## 十一、文档维护规范

### 11.1 必须维护的文档

1. **README.md** - 项目说明
2. **PRD.md** - 产品需求文档
3. **TECH_DESIGN.md** - 技术设计文档
4. **API.md** - API 接口文档
5. **DEV_GUIDE.md** - 开发规范文档（本文档）
6. **CHANGELOG.md** - 版本更新日志

---

### 11.2 文档更新时机

- 新功能开发前：更新 PRD 和技术设计文档
- 接口变更时：更新 API 文档
- 发布新版本时：更新 CHANGELOG
- 规范调整时：更新 DEV_GUIDE

---

## 十二、开发工具推荐

### 12.1 必备工具

- **HBuilderX** - uni-app 官方 IDE
- **微信开发者工具** - 微信小程序调试
- **VS Code** - 代码编辑器（备选）

### 12.2 VS Code 推荐插件

- **Volar** - Vue 3 语言支持
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **uni-helper** - uni-app 代码提示
- **SCSS IntelliSense** - SCSS 智能提示
- **Path Intellisense** - 路径智能提示

### 12.3 浏览器工具

- **Vue Devtools** - Vue 调试工具
- **Chrome DevTools** - 浏览器调试工具

---

## 十三、常见问题（FAQ）

### Q1: 什么时候使用 Pinia，什么时候使用 Props？
**A**:
- 父子组件通信 → 使用 Props & Emits
- 跨多层组件通信 → 使用 Provide/Inject
- 全局共享状态 → 使用 Pinia

### Q2: 图片应该放在哪里？
**A**:
- 静态图片 → `src/static/images/`
- 动态加载的图片 → CDN 或服务器

### Q3: 如何调试小程序？
**A**:
- 使用微信开发者工具
- 使用 `console.log` 查看日志
- 使用 `debugger` 断点调试

### Q4: H5 和小程序有什么区别？
**A**:
- 部分 API 不同（使用条件编译处理）
- 样式渲染可能有差异
- 性能表现不同

---

## 十四、学习资源

### 官方文档
- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/zh/)

### 推荐教程
- uni-app 从入门到实战
- Vue 3 组合式 API 教程
- 微信小程序开发指南

---

**文档版本**: v1.0
**编写日期**: 2025-12-13
**维护者**: 开发团队

---

## 附录：快速参考

### 常用命令
```bash
# 安装依赖
npm install

# 开发（H5）
npm run dev:h5

# 开发（微信小程序）
npm run dev:mp-weixin

# 构建（H5）
npm run build:h5

# 构建（微信小程序）
npm run build:mp-weixin
```

### 常用代码片段

#### uni-app 页面跳转
```javascript
// 保留当前页面，跳转到应用内的某个页面
uni.navigateTo({
  url: '/pages/detail/index?id=knot_001'
});

// 关闭当前页面，跳转到应用内的某个页面
uni.redirectTo({
  url: '/pages/gallery/index'
});

// 关闭所有页面，打开到应用内的某个页面
uni.reLaunch({
  url: '/pages/home/index'
});

// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
uni.switchTab({
  url: '/pages/home/index'
});

// 返回上一页面
uni.navigateBack({
  delta: 1
});
```

#### 提示信息
```javascript
// Toast 提示
uni.showToast({
  title: '操作成功',
  icon: 'success',
  duration: 2000
});

// Loading 提示
uni.showLoading({
  title: '加载中...'
});
uni.hideLoading();

// Modal 弹窗
uni.showModal({
  title: '提示',
  content: '确定要删除吗？',
  success: (res) => {
    if (res.confirm) {
      console.log('用户点击确定');
    }
  }
});
```

---

**结束** 🎉
