// 常量定义

// API 基础 URL
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// 分类列表
export const CATEGORIES = [
  {
    id: 'art',
    name: '艺术结',
    nameEn: 'Artistic Knots',
    description: '以艺术欣赏为主，造型复杂精美'
  },
  {
    id: 'auspicious',
    name: '吉祥结',
    nameEn: 'Auspicious Knots',
    description: '寓意吉祥美好，常用于节日庆典'
  },
  {
    id: 'decorative',
    name: '装饰结',
    nameEn: 'Decorative Knots',
    description: '用于装饰搭配，实用美观'
  },
  {
    id: 'practical',
    name: '实用结',
    nameEn: 'Practical Knots',
    description: '具有实用功能的基础结'
  }
];

// 难度等级
export const DIFFICULTY_LEVELS = {
  1: '入门',
  2: '简单',
  3: '中等',
  4: '困难',
  5: '专家'
};

// 3D 查看器配置
export const VIEWER_CONFIG = {
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 0, z: 5 }
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    rotateSpeed: 0.5,
    zoomSpeed: 1.0,
    minDistance: 2,
    maxDistance: 10
  },
  lights: {
    ambient: { color: 0xffffff, intensity: 0.5 },
    directional: { color: 0xffffff, intensity: 1.0 }
  }
};
