# 中国结云展览 - API接口文档

## 一、接口概述

### 1.1 基础信息

- **Base URL（开发环境）**: `http://localhost:3000/api/v1`
- **Base URL（生产环境）**: `https://api.chinaknot.com/api/v1`
- **协议**: HTTPS
- **数据格式**: JSON
- **字符编码**: UTF-8

### 1.2 通用规范

#### 请求头（Request Headers）
```
Content-Type: application/json
Accept: application/json
```

#### 响应格式（Response Format）
所有接口统一返回以下格式：

**成功响应**：
```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 具体数据
  },
  "timestamp": 1702468800000
}
```

**失败响应**：
```json
{
  "code": 400,
  "message": "参数错误",
  "data": null,
  "timestamp": 1702468800000
}
```

#### 状态码（Status Codes）
| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 二、分类相关接口

### 2.1 获取所有分类

**接口地址**: `GET /categories`

**接口描述**: 获取所有中国结分类列表

**请求参数**: 无

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "art",
      "name": "艺术结",
      "nameEn": "Artistic Knots",
      "description": "以艺术欣赏为主，造型复杂精美",
      "icon": "/static/images/icons/art.png",
      "order": 1,
      "itemCount": 6,
      "coverImage": "/static/images/category/art-cover.jpg"
    },
    {
      "id": "auspicious",
      "name": "吉祥结",
      "nameEn": "Auspicious Knots",
      "description": "寓意吉祥美好，常用于节日庆典",
      "icon": "/static/images/icons/auspicious.png",
      "order": 2,
      "itemCount": 7,
      "coverImage": "/static/images/category/auspicious-cover.jpg"
    },
    {
      "id": "decorative",
      "name": "装饰结",
      "nameEn": "Decorative Knots",
      "description": "用于装饰搭配，实用美观",
      "icon": "/static/images/icons/decorative.png",
      "order": 3,
      "itemCount": 5,
      "coverImage": "/static/images/category/decorative-cover.jpg"
    },
    {
      "id": "practical",
      "name": "实用结",
      "nameEn": "Practical Knots",
      "description": "具有实用功能的基础结",
      "icon": "/static/images/icons/practical.png",
      "order": 4,
      "itemCount": 6,
      "coverImage": "/static/images/category/practical-cover.jpg"
    }
  ],
  "timestamp": 1702468800000
}
```

---

### 2.2 获取单个分类详情

**接口地址**: `GET /categories/:id`

**接口描述**: 根据分类ID获取分类详细信息

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 分类ID，如：art, auspicious |

**请求示例**:
```
GET /categories/art
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "art",
    "name": "艺术结",
    "nameEn": "Artistic Knots",
    "description": "以艺术欣赏为主，造型复杂精美，充分体现中国结的艺术价值",
    "icon": "/static/images/icons/art.png",
    "order": 1,
    "itemCount": 6,
    "coverImage": "/static/images/category/art-cover.jpg",
    "detailedDescription": "艺术结是中国结中最具观赏性的类别..."
  },
  "timestamp": 1702468800000
}
```

---

### 2.3 获取分类下的作品

**接口地址**: `GET /categories/:id/items`

**接口描述**: 获取指定分类下的所有中国结作品

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 分类ID |

**查询参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |
| sortBy | string | 否 | 排序字段：name, difficulty, viewCount |
| order | string | 否 | 排序方式：asc, desc，默认asc |

**请求示例**:
```
GET /categories/art/items?page=1&pageSize=10&sortBy=name&order=asc
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 6,
    "page": 1,
    "pageSize": 10,
    "items": [
      {
        "id": "knot_001",
        "name": "盘长结",
        "nameEn": "Pan Chang Knot",
        "categoryId": "art",
        "categoryName": "艺术结",
        "thumbnail": "/static/images/knots/panchang-thumb.jpg",
        "image": "/static/images/knots/panchang-large.jpg",
        "description": "盘长结是中国结中最复杂精美的结型之一",
        "difficulty": 5,
        "viewCount": 1520,
        "likeCount": 230
      }
      // ... 更多作品
    ]
  },
  "timestamp": 1702468800000
}
```

---

## 三、作品相关接口

### 3.1 获取作品列表

**接口地址**: `GET /items`

**接口描述**: 获取所有中国结作品，支持筛选、搜索和分页

**查询参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| categoryId | string | 否 | 分类ID筛选 |
| keyword | string | 否 | 搜索关键词（名称/描述） |
| difficulty | number | 否 | 难度筛选（1-5） |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |
| sortBy | string | 否 | 排序字段 |
| order | string | 否 | 排序方式 |

**请求示例**:
```
GET /items?categoryId=auspicious&difficulty=3&page=1&pageSize=10
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 25,
    "page": 1,
    "pageSize": 10,
    "totalPages": 3,
    "items": [
      {
        "id": "knot_001",
        "name": "双线结",
        "nameEn": "Double Connection Knot",
        "categoryId": "auspicious",
        "categoryName": "吉祥结",
        "thumbnail": "/static/images/knots/shuangxian-thumb.jpg",
        "image": "/static/images/knots/shuangxian-large.jpg",
        "description": "双线结寓意好事成双、双喜临门",
        "difficulty": 2,
        "viewCount": 2340,
        "likeCount": 456,
        "tags": ["基础结", "吉祥", "喜庆"],
        "hasModel": false
      }
      // ... 更多作品
    ]
  },
  "timestamp": 1702468800000
}
```

---

### 3.2 获取作品详情

**接口地址**: `GET /items/:id`

**接口描述**: 根据作品ID获取详细信息

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 作品ID |

**请求示例**:
```
GET /items/knot_001
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "knot_001",
    "name": "双线结",
    "nameEn": "Double Connection Knot",
    "categoryId": "auspicious",
    "categoryName": "吉祥结",

    "thumbnail": "/static/images/knots/shuangxian-thumb.jpg",
    "image": "/static/images/knots/shuangxian-large.jpg",
    "images": [
      "/static/images/knots/shuangxian-1.jpg",
      "/static/images/knots/shuangxian-2.jpg",
      "/static/images/knots/shuangxian-3.jpg"
    ],

    "description": "双线结是中国结中最基础的结型之一，寓意好事成双、双喜临门。",
    "detailedDescription": "双线结又称双钱结，因其形似两个古铜钱相叠而得名。这种结在唐代就已经出现，在宫廷服饰中广泛使用。双线结编织简单，但寓意深远，象征着财富和好运的双倍到来。",

    "history": "双线结起源于唐代，在宫廷服饰中广泛使用。据史料记载，唐代女性常用双线结装饰发髻，象征美满姻缘。到了明清时期，双线结更是成为婚庆必备的装饰元素。",

    "culturalMeaning": "双线结象征好事成双、财源广进，在中国传统文化中寓意极为吉祥。常用于婚庆喜事，代表新人永结同心、百年好合。在春节等节日，人们也喜欢用双线结装饰家居，祈求来年好运连连。",

    "symbolism": "两个圆环紧密相扣，寓意心心相印、永结同心。结的形状如同古代铜钱，象征财源滚滚、富贵吉祥。",

    "technique": "双线结采用双线交叉编织法，需要两根等长的线绳。基本步骤包括：1) 将两根线对折形成四股；2) 按照一定规律交叉穿插；3) 收紧调整形状。编织时需注意力度均匀，保持结型对称美观。",

    "difficulty": 2,
    "materials": [
      "5号线（红色）2根，每根约80cm",
      "打火机1个（用于处理线头）",
      "剪刀1把"
    ],
    "tools": [
      "珠针若干（用于固定）",
      "泡沫板1块（编织底板）"
    ],

    "steps": [
      {
        "order": 1,
        "title": "准备线材",
        "description": "取两根80cm的5号红线，对齐后对折，形成四股线",
        "image": "/static/images/steps/shuangxian-step1.jpg"
      },
      {
        "order": 2,
        "title": "编织第一个环",
        "description": "左侧两股线向右弯曲形成圆环，用珠针固定",
        "image": "/static/images/steps/shuangxian-step2.jpg"
      },
      {
        "order": 3,
        "title": "编织第二个环",
        "description": "右侧两股线向左弯曲，与第一个环交叉穿过",
        "image": "/static/images/steps/shuangxian-step3.jpg"
      },
      {
        "order": 4,
        "title": "调整收紧",
        "description": "轻轻拉紧四股线，调整结型使其对称美观，剪掉多余线头",
        "image": "/static/images/steps/shuangxian-step4.jpg"
      }
    ],

    "relatedItemIds": ["knot_002", "knot_005", "knot_008"],
    "tags": ["基础结", "吉祥", "喜庆", "婚庆"],

    "hasModel": false,
    "modelUrl": "",

    "viewCount": 2340,
    "likeCount": 456,
    "createdAt": "2025-12-01T08:00:00.000Z",
    "updatedAt": "2025-12-13T10:00:00.000Z"
  },
  "timestamp": 1702468800000
}
```

---

### 3.3 获取相关作品

**接口地址**: `GET /items/:id/related`

**接口描述**: 获取与指定作品相关的其他作品

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 作品ID |

**查询参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| limit | number | 否 | 返回数量，默认4 |

**请求示例**:
```
GET /items/knot_001/related?limit=4
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "knot_002",
      "name": "如意结",
      "categoryId": "auspicious",
      "categoryName": "吉祥结",
      "thumbnail": "/static/images/knots/ruyi-thumb.jpg",
      "description": "如意结象征万事如意、心想事成",
      "difficulty": 3
    }
    // ... 更多相关作品
  ],
  "timestamp": 1702468800000
}
```

---

### 3.4 搜索作品

**接口地址**: `GET /items/search`

**接口描述**: 根据关键词搜索中国结作品

**查询参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| q | string | 是 | 搜索关键词 |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |

**请求示例**:
```
GET /items/search?q=吉祥&page=1&pageSize=10
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 12,
    "page": 1,
    "pageSize": 10,
    "keyword": "吉祥",
    "items": [
      {
        "id": "knot_003",
        "name": "吉祥结",
        "categoryId": "auspicious",
        "thumbnail": "/static/images/knots/jixiang-thumb.jpg",
        "description": "吉祥结象征吉祥如意、福寿安康",
        "matchField": "name"
      }
      // ... 更多搜索结果
    ]
  },
  "timestamp": 1702468800000
}
```

---

## 四、首页相关接口

### 4.1 获取首页数据

**接口地址**: `GET /home`

**接口描述**: 获取首页所需的所有数据（一次性返回）

**请求参数**: 无

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "banner": {
      "title": "心有千千结 云上共此时",
      "subtitle": "探索中国结的千年传承与文化之美",
      "description": "中国结承载着中华民族的智慧与祝福，每一个结都蕴含着深厚的文化内涵。让我们一起走进中国结的艺术世界，感受传统文化的魅力。",
      "backgroundImage": "/static/images/home/banner-bg.jpg"
    },

    "statistics": {
      "totalItems": 28,
      "totalCategories": 4,
      "totalViews": 15680
    },

    "featuredItems": [
      {
        "id": "knot_001",
        "name": "盘长结",
        "categoryName": "艺术结",
        "thumbnail": "/static/images/knots/panchang-thumb.jpg",
        "description": "盘长结是中国结中最复杂精美的结型之一",
        "difficulty": 5,
        "viewCount": 2560
      },
      {
        "id": "knot_002",
        "name": "双线结",
        "categoryName": "吉祥结",
        "thumbnail": "/static/images/knots/shuangxian-thumb.jpg",
        "description": "双线结寓意好事成双、双喜临门",
        "difficulty": 2,
        "viewCount": 2340
      }
      // ... 更多精选作品（推荐6-8个）
    ],

    "categories": [
      {
        "id": "art",
        "name": "艺术结",
        "icon": "/static/images/icons/art.png",
        "itemCount": 6
      },
      {
        "id": "auspicious",
        "name": "吉祥结",
        "icon": "/static/images/icons/auspicious.png",
        "itemCount": 7
      },
      {
        "id": "decorative",
        "name": "装饰结",
        "icon": "/static/images/icons/decorative.png",
        "itemCount": 5
      },
      {
        "id": "practical",
        "name": "实用结",
        "icon": "/static/images/icons/practical.png",
        "itemCount": 6
      }
    ]
  },
  "timestamp": 1702468800000
}
```

---

### 4.2 获取轮播数据（可选）

**接口地址**: `GET /home/banners`

**接口描述**: 获取首页轮播图数据

**请求参数**: 无

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "banner_001",
      "title": "心有千千结 云上共此时",
      "image": "/static/images/banners/banner1.jpg",
      "link": "/pages/gallery/index",
      "order": 1
    }
    // ... 更多轮播图
  ],
  "timestamp": 1702468800000
}
```

---

### 4.3 获取统计数据

**接口地址**: `GET /home/statistics`

**接口描述**: 获取首页统计数据

**请求参数**: 无

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalItems": 28,
    "totalCategories": 4,
    "totalViews": 15680,
    "totalLikes": 3420
  },
  "timestamp": 1702468800000
}
```

---

### 4.4 获取精选作品

**接口地址**: `GET /home/featured`

**接口描述**: 获取首页精选作品

**查询参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| limit | number | 否 | 返回数量，默认6 |

**请求示例**:
```
GET /home/featured?limit=6
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "knot_001",
      "name": "盘长结",
      "categoryName": "艺术结",
      "thumbnail": "/static/images/knots/panchang-thumb.jpg",
      "description": "盘长结是中国结中最复杂精美的结型之一",
      "difficulty": 5,
      "viewCount": 2560,
      "featured": true,
      "featuredReason": "最受欢迎的艺术结"
    }
    // ... 更多精选作品
  ],
  "timestamp": 1702468800000
}
```

---

## 五、用户交互接口（可选扩展）

### 5.1 增加浏览次数

**接口地址**: `POST /items/:id/view`

**接口描述**: 记录作品浏览次数

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 作品ID |

**请求示例**:
```
POST /items/knot_001/view
```

**响应示例**:
```json
{
  "code": 200,
  "message": "浏览次数已记录",
  "data": {
    "itemId": "knot_001",
    "viewCount": 2341
  },
  "timestamp": 1702468800000
}
```

---

### 5.2 点赞作品（可选）

**接口地址**: `POST /items/:id/like`

**接口描述**: 为作品点赞

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 作品ID |

**响应示例**:
```json
{
  "code": 200,
  "message": "点赞成功",
  "data": {
    "itemId": "knot_001",
    "likeCount": 457,
    "liked": true
  },
  "timestamp": 1702468800000
}
```

---

### 5.3 取消点赞（可选）

**接口地址**: `DELETE /items/:id/like`

**接口描述**: 取消作品点赞

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 作品ID |

**响应示例**:
```json
{
  "code": 200,
  "message": "已取消点赞",
  "data": {
    "itemId": "knot_001",
    "likeCount": 456,
    "liked": false
  },
  "timestamp": 1702468800000
}
```

---

## 六、错误码说明

### 6.1 业务错误码

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| 10001 | 分类不存在 | 检查分类ID是否正确 |
| 10002 | 作品不存在 | 检查作品ID是否正确 |
| 10003 | 参数格式错误 | 检查请求参数类型和格式 |
| 10004 | 缺少必填参数 | 补充缺失的参数 |
| 10005 | 搜索关键词为空 | 提供有效的搜索关键词 |
| 10006 | 页码超出范围 | 使用有效的页码 |

### 6.2 错误响应示例

```json
{
  "code": 10002,
  "message": "作品不存在",
  "data": null,
  "timestamp": 1702468800000,
  "error": {
    "field": "id",
    "value": "knot_999",
    "reason": "该作品ID不存在于数据库中"
  }
}
```

---

## 七、接口调用示例

### 7.1 JavaScript (uni-app)

```javascript
// 封装的请求函数
import { request } from '@/api/request';

// 获取作品列表
export const getKnotList = (params) => {
  return request({
    url: '/items',
    method: 'GET',
    data: params
  });
};

// 使用示例
async function fetchKnots() {
  try {
    const res = await getKnotList({
      categoryId: 'art',
      page: 1,
      pageSize: 10
    });

    if (res.code === 200) {
      console.log('作品列表：', res.data.items);
    }
  } catch (error) {
    console.error('请求失败：', error);
    uni.showToast({
      title: '获取数据失败',
      icon: 'none'
    });
  }
}
```

---

### 7.2 使用 uni.request

```javascript
uni.request({
  url: 'https://api.chinaknot.com/api/v1/items/knot_001',
  method: 'GET',
  header: {
    'Content-Type': 'application/json'
  },
  success: (res) => {
    if (res.statusCode === 200 && res.data.code === 200) {
      console.log('作品详情：', res.data.data);
    }
  },
  fail: (error) => {
    console.error('请求失败：', error);
  }
});
```

---

### 7.3 批量请求（Promise.all）

```javascript
async function fetchHomeData() {
  try {
    const [categoriesRes, featuredRes, statsRes] = await Promise.all([
      getCategories(),
      getFeaturedItems({ limit: 6 }),
      getStatistics()
    ]);

    return {
      categories: categoriesRes.data,
      featured: featuredRes.data,
      statistics: statsRes.data
    };
  } catch (error) {
    console.error('获取首页数据失败：', error);
    throw error;
  }
}
```

---

## 八、Mock数据说明

开发阶段可以使用Mock数据，无需真实后端接口。

### 8.1 Mock数据文件结构

```
src/mock/
├── categories.js    # 分类数据
├── knots.js         # 作品数据
└── home.js          # 首页数据
```

### 8.2 Mock数据示例

```javascript
// src/mock/knots.js
export const mockKnots = [
  {
    id: 'knot_001',
    name: '双线结',
    categoryId: 'auspicious',
    categoryName: '吉祥结',
    thumbnail: '/static/images/knots/shuangxian-thumb.jpg',
    image: '/static/images/knots/shuangxian-large.jpg',
    description: '双线结寓意好事成双、双喜临门',
    detailedDescription: '双线结又称双钱结...',
    history: '双线结起源于唐代...',
    culturalMeaning: '象征好事成双、财源广进...',
    symbolism: '两个圆环相扣，寓意心心相印...',
    technique: '采用双线交叉编织法...',
    difficulty: 2,
    materials: ['5号线（红色）', '打火机', '剪刀'],
    tools: ['珠针', '泡沫板'],
    relatedItemIds: ['knot_002', 'knot_005'],
    tags: ['基础结', '吉祥', '喜庆'],
    hasModel: false,
    modelUrl: '',
    viewCount: 2340,
    likeCount: 456,
    createdAt: '2025-12-01T08:00:00.000Z',
    updatedAt: '2025-12-13T10:00:00.000Z'
  }
  // ... 更多数据
];
```

### 8.3 Mock接口实现

```javascript
// src/api/item.js
import { mockKnots } from '@/mock/knots';

export const getKnotList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = mockKnots;

      // 分类筛选
      if (params.categoryId) {
        result = result.filter(item => item.categoryId === params.categoryId);
      }

      // 难度筛选
      if (params.difficulty) {
        result = result.filter(item => item.difficulty === params.difficulty);
      }

      // 关键词搜索
      if (params.keyword) {
        result = result.filter(item =>
          item.name.includes(params.keyword) ||
          item.description.includes(params.keyword)
        );
      }

      // 分页
      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      resolve({
        code: 200,
        message: 'success',
        data: {
          total: result.length,
          page,
          pageSize,
          totalPages: Math.ceil(result.length / pageSize),
          items: result.slice(start, end)
        }
      });
    }, 300); // 模拟网络延迟
  });
};
```

---

## 九、接口测试建议

### 9.1 测试工具
- **Postman**: API接口测试
- **Apifox**: 接口文档 + 测试
- **浏览器DevTools**: 调试网络请求

### 9.2 测试用例

#### 正常流程测试
1. 获取所有分类 → 验证返回4个分类
2. 获取艺术结分类下的作品 → 验证分类筛选
3. 获取单个作品详情 → 验证数据完整性
4. 搜索"吉祥" → 验证搜索功能
5. 分页获取作品 → 验证分页逻辑

#### 异常流程测试
1. 使用不存在的分类ID → 验证错误处理
2. 使用不存在的作品ID → 验证404处理
3. 缺少必填参数 → 验证参数校验
4. 超出页码范围 → 验证边界处理

---

## 十、版本更新记录

### v1.0 (2025-12-13)
- 初始版本
- 实现基础的分类、作品、首页接口
- 支持筛选、搜索、分页功能

### 未来规划 (v1.1+)
- 用户系统接口（登录、注册）
- 收藏功能接口
- 评论功能接口
- 分享功能接口
- 学习进度记录接口

---

**文档版本**: v1.0
**编写日期**: 2025-12-13
**维护者**: 开发团队
**联系方式**: dev@chinaknot.com
