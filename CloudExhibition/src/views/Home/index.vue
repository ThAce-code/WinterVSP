<template>
  <div class="home-page">
    <div class="hero-section">
      <BlurText
        text="心有千千结 云上共此时"
        :delay="150"
        class-name="title"
        animate-by="words"
        direction="top"
        :threshold="0.1"
        root-margin="0px"
        :step-duration="0.4"
        @animation-complete="handleAnimationComplete"
      />
      <p class="subtitle">欢迎进入线上结艺殿堂，探寻一根红绳如何编织出千年的祝福、智慧与美</p>
      <button class="btn btn-primary" @click="goToGallery">进入展览</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import BlurText from '@/components/BlurText.vue';

const router = useRouter();

const goToGallery = () => {
  router.push('/gallery');
};

const handleAnimationComplete = () => {
  console.log('Title animation complete!');
};
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.home-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/images/bg/Home\'sBackgroundNoWaterMark.png') no-repeat center center;
  background-size: cover;
}

.hero-section {
  text-align: center;
  padding: $spacing-xxl;
  max-width: 1400px;
  margin-top: 240px;
}

.title {
  font-size: 5.5rem;
  color: $text-primary;
  margin-bottom: 10rem;
  font-weight: bold;
  letter-spacing: 0.3em;
  font-family: '楷体', 'KaiTi', serif;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.2);
  animation: float 3s ease-in-out infinite;
}

.subtitle {
  font-size: $font-size-xl;
  font-weight: bold;
  color: $text-primary;
  margin-bottom: 3rem;
  line-height: 1.8;
  font-family: '楷体', 'KaiTi', serif;
}

.btn {
  font-size: $font-size-base;
  padding: 0.75rem 3rem;
  border: 2px solid $text-primary;
  background: transparent;
  color: $text-primary;
  border-radius: 0;

  &:hover {
    background: $text-primary;
    color: #fff;
    transform: translateY(-2px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
