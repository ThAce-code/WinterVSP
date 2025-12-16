// Mock 中国结作品数据

export const mockKnots = [
  // 艺术结
  {
    id: 'knot_001',
    name: '盘长结',
    nameEn: 'Pan Chang Knot',
    categoryId: 'art',
    categoryName: '艺术结',
    thumbnail: '/src/assets/images/knots/panchang-thumb.jpg',
    image: '/src/assets/images/knots/panchang-large.jpg',
    modelUrl: '/src/assets/models/art/panchang.glb',
    description: '盘长结是中国结中最复杂精美的结型之一，象征吉祥如意，回环往复',
    detailedDescription: '盘长结又称吉祥结，是佛教八宝之一。其结构复杂，线条流畅，造型对称美观。盘长结因其形似盘长而得名，寓意生生不息、长久吉祥。在藏传佛教中，盘长结代表智慧与慈悲的结合，象征着佛法的永恒与圆满。',
    history: '盘长结起源于唐代，在宋代得到广泛发展。据《岁华纪丽谱》记载："以锦结为盘长，加以珠玉，谓之同心结。"盘长结在清代宫廷装饰中达到鼎盛，常用于皇室服饰和宫殿装饰。',
    culturalMeaning: '盘长结象征着吉祥、长久、圆满，代表生命的轮回与永恒。在中国传统文化中，盘长结寓意福寿绵长、幸福美满，是最受欢迎的装饰结之一。',
    symbolism: '回环往复，生生不息。线条连绵不断，象征着爱情永恒、友谊长存、事业兴旺。',
    technique: '盘长结采用复合编结法，需要掌握外耳、内耳的穿编技巧。编结时要保持线条的均匀和对称，注意每个交叉点的走线顺序。建议从中心开始编，逐步向外扩展。',
    difficulty: 5,
    materials: ['5号线（红色）3米', '打火机', '剪刀', '珠针'],
    tools: ['编织垫板', '定位尺'],
    relatedItemIds: ['knot_002', 'knot_003'],
    tags: ['艺术结', '佛教', '宫廷', '复杂'],
    hasModel: true,
    viewCount: 2560,
    likeCount: 456,
    createdAt: '2025-01-01T08:00:00.000Z',
    updatedAt: '2025-12-13T10:00:00.000Z'
  },
  {
    id: 'knot_002',
    name: '团锦结',
    nameEn: 'Brocade Ball Knot',
    categoryId: 'art',
    categoryName: '艺术结',
    thumbnail: '/src/assets/images/knots/tuanjin-thumb.jpg',
    image: '/src/assets/images/knots/tuanjin-large.jpg',
    modelUrl: '/src/assets/models/art/tuanjin.glb',
    description: '团锦结造型华丽，结构紧密，如同锦团，象征团圆美满',
    detailedDescription: '团锦结因其造型酷似锦缎织成的圆球而得名。该结结构紧凑，花纹精致，展开时如同花团锦簇，收拢时又似锦绣圆球。团锦结在中国结艺中享有盛名，被誉为"结中之王"。',
    history: '团锦结源于宋代，在明清时期广泛流行。古代妇女常用团锦结装饰衣裙，寓意团圆幸福。',
    culturalMeaning: '象征团圆、美满、富贵，是新婚喜庆的首选装饰。',
    symbolism: '花团锦簇，圆满如意',
    technique: '采用六耳锦结法，需要掌握套叠技巧。编织时注意保持结型的对称性。',
    difficulty: 5,
    materials: ['5号线（多色）2.5米', '珠子（可选）'],
    tools: ['编织垫板', '珠针'],
    relatedItemIds: ['knot_001', 'knot_004'],
    tags: ['艺术结', '华丽', '喜庆'],
    hasModel: true,
    viewCount: 2180,
    likeCount: 398,
    createdAt: '2025-01-02T08:00:00.000Z',
    updatedAt: '2025-12-13T10:00:00.000Z'
  },

  // 吉祥结
  {
    id: 'knot_003',
    name: '双线结',
    nameEn: 'Double Connection Knot',
    categoryId: 'auspicious',
    categoryName: '吉祥结',
    thumbnail: '/src/assets/images/knots/shuangxian-thumb.jpg',
    image: '/src/assets/images/knots/shuangxian-large.jpg',
    modelUrl: '/src/assets/models/auspicious/shuangxian.glb',
    description: '双线结寓意好事成双、双喜临门，造型简洁大方',
    detailedDescription: '双线结又称双钱结，因其形似两个古铜钱相叠而得名。这种结编织简单，但寓意深远，象征着财富和好运的双倍到来。双线结常用于婚庆场合，代表新人成双成对、永结同心。',
    history: '双线结起源于唐代，在宫廷服饰中广泛使用。据史料记载，唐代女性常用双线结装饰发髻，象征美满姻缘。',
    culturalMeaning: '象征好事成双、财源广进，常用于婚庆喜事，代表新人永结同心、百年好合。',
    symbolism: '两个圆环相扣，寓意心心相印、永结同心',
    technique: '采用双线交叉编织法，需要掌握基本的穿绕技巧。编织时注意保持两个圆环的大小一致。',
    difficulty: 2,
    materials: ['5号线（红色）1.5米', '打火机', '剪刀'],
    tools: ['珠针', '泡沫板'],
    relatedItemIds: ['knot_004', 'knot_005'],
    tags: ['吉祥结', '基础', '喜庆', '婚庆'],
    hasModel: true,
    viewCount: 3420,
    likeCount: 678,
    createdAt: '2025-01-03T08:00:00.000Z',
    updatedAt: '2025-12-13T10:00:00.000Z'
  },
  {
    id: 'knot_004',
    name: '如意结',
    nameEn: 'Ruyi Knot',
    categoryId: 'auspicious',
    categoryName: '吉祥结',
    thumbnail: '/src/assets/images/knots/ruyi-thumb.jpg',
    image: '/src/assets/images/knots/ruyi-large.jpg',
    modelUrl: '/src/assets/models/auspicious/ruyi.glb',
    description: '如意结形似如意，象征万事如意、心想事成',
    detailedDescription: '如意结造型优美，形状酷似古代的如意，因而得名。该结线条流畅，结型饱满，给人以圆润美满的视觉感受。如意结在民间极为流行，是人们表达美好祝愿的常用结式。',
    history: '如意结源于明代，清代时成为宫廷常用装饰。如意本是古代贵族的用品，象征权力和地位。',
    culturalMeaning: '象征万事如意、心想事成、吉祥安康，常用于新年祝福。',
    symbolism: '形似如意，寓意称心如意、事事顺心',
    technique: '采用三耳式编法，需要掌握耳翼的塑形技巧。',
    difficulty: 3,
    materials: ['5号线（红色或金色）2米'],
    tools: ['珠针', '编织垫板'],
    relatedItemIds: ['knot_003', 'knot_006'],
    tags: ['吉祥结', '祝福', '新年'],
    hasModel: true,
    viewCount: 2890,
    likeCount: 534,
    createdAt: '2025-01-04T08:00:00.000Z',
    updatedAt: '2025-12-13T10:00:00.000Z'
  },

  // 装饰结
  {
    id: 'knot_005',
    name: '纽扣结',
    nameEn: 'Button Knot',
    categoryId: 'decorative',
    categoryName: '装饰结',
    thumbnail: '/src/assets/images/knots/niukou-thumb.jpg',
    image: '/src/assets/images/knots/niukou-large.jpg',
    modelUrl: '/src/assets/models/decorative/niukou.glb',
    description: '纽扣结小巧精致，可用作衣服纽扣，实用又美观',
    detailedDescription: '纽扣结是最实用的中国结之一，既可作为装饰，又可作为纽扣使用。该结结构紧密，不易松散，大小适中，非常适合用于唐装、旗袍等传统服饰的纽扣。',
    history: '纽扣结历史悠久，早在汉代就有记载。古代没有现代的纽扣，人们用结绳的方式固定衣物。',
    culturalMeaning: '象征精致、实用，体现中国人追求实用与美观相结合的哲学。',
    symbolism: '小巧精致，以小见大',
    technique: '采用单线回环法，需要掌握收紧的力度控制。',
    difficulty: 2,
    materials: ['5号线（任意颜色）50cm'],
    tools: ['打火机'],
    relatedItemIds: ['knot_006', 'knot_007'],
    tags: ['装饰结', '实用', '服饰'],
    hasModel: true,
    viewCount: 4120,
    likeCount: 789,
    createdAt: '2025-01-05T08:00:00.000Z',
    updatedAt: '2025-12-13T10:00:00.000Z'
  },

  // 实用结
  {
    id: 'knot_006',
    name: '平结',
    nameEn: 'Square Knot',
    categoryId: 'practical',
    categoryName: '实用结',
    thumbnail: '/src/assets/images/knots/pingjie-thumb.jpg',
    image: '/src/assets/images/knots/pingjie-large.jpg',
    modelUrl: '/src/assets/models/practical/pingjie.glb',
    description: '平结是最基础的实用结，结构牢固，易学易用',
    detailedDescription: '平结是中国结的基础结型，也是其他复杂结型的基础。该结由两组左右对称的半结组成，结构简单但非常牢固。平结在日常生活中应用广泛，是编结爱好者必学的第一个结。',
    history: '平结历史可追溯至远古时代，是人类最早使用的结绳方法之一。',
    culturalMeaning: '象征平稳、安定、公平，体现中国人追求平和的生活态度。',
    symbolism: '平平安安，稳如磐石',
    technique: '采用左右对称编法，掌握左压右、右压左的基本规律即可。',
    difficulty: 1,
    materials: ['任意绳线'],
    tools: ['无'],
    relatedItemIds: ['knot_005', 'knot_007'],
    tags: ['实用结', '基础', '入门'],
    hasModel: true,
    viewCount: 5680,
    likeCount: 912,
    createdAt: '2025-01-06T08:00:00.000Z',
    updatedAt: '2025-12-13T10:00:00.000Z'
  }
];

// 根据分类ID获取作品
export function getKnotsByCategory(categoryId) {
  if (!categoryId) return mockKnots;
  return mockKnots.filter(knot => knot.categoryId === categoryId);
}

// 根据作品ID获取作品
export function getKnotById(id) {
  return mockKnots.find(knot => knot.id === id);
}

// 获取相关作品
export function getRelatedKnots(knotId) {
  const knot = getKnotById(knotId);
  if (!knot || !knot.relatedItemIds) return [];
  return mockKnots.filter(k => knot.relatedItemIds.includes(k.id));
}
