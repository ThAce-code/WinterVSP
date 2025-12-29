<template>
  <div class="home-page">
    <div class="hero-section">
      <!-- 标题文字模糊淡入动画组件 -->
      <BlurText
        text="心有千千结 云上共此时"
        :delay="120"
        class-name="title"
        animate-by="letters"
        direction="top"
        :threshold="0.1"
        root-margin="0px"
        :step-duration="0.4"
        :animation-from="{ filter: 'blur(10px)', opacity: 0, y: -150 }"
        @animation-complete="handleAnimationComplete"
      />
      <!-- 副标题 -->
      <p class="subtitle">欢迎进入线上结艺殿堂，探寻一根红绳如何编织出千年的祝福、智慧与美</p>
      <!-- 进入展览按钮 -->
      <button class="btn btn-primary" @click="goToGallery">进入展览</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import BlurText from '@/components/BlurText.vue';

const router = useRouter();

// 跳转到展览页面
const goToGallery = () => {
  router.push('/gallery');
};

// 标题动画完成回调
const handleAnimationComplete = () => {
  console.log('Title animation complete!');
};
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

/* 首页全屏背景 */
.home-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/images/bg/Home\'sBackgroundNoWaterMark.png') no-repeat center center;
  background-size: cover;
}

/* 主内容区域 */
.hero-section {
  text-align: center;
  padding: $spacing-xxl;
  max-width: 1400px;
  margin-top: 240px;
}

/* 标题样式 */
.title {
  font-size: 5.5rem;
  color: $text-primary;
  margin-bottom: 8.5rem;
  font-weight: bold;
  letter-spacing: 0.3em;
  font-family: '楷体', 'KaiTi', serif;
  // 多层文字阴影，营造悬浮感
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.2);
  // 上下浮动动画
  animation: float 3s ease-in-out infinite;
}

/* 副标题样式 */
.subtitle {
  font-size: $font-size-xl;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: 5.5rem;
  line-height: 1.8;
  font-family: '楷体', 'KaiTi', serif;
}

/* 按钮基础样式 */
.btn {
  font-size: $font-size-base;
  padding: 0.75rem 3rem;
  border: 2px solid $text-primary;
  background: transparent;
  color: $text-primary;
  border-radius: 0;

  // 悬停效果
  &:hover {
    background: $text-primary;
    color: #fff;
    transform: translateY(-2px);
  }
}

/* 标题上下浮动动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
