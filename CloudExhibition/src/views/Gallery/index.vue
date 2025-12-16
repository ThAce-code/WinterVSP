<template>
  <div class="gallery-page">
    <h1 class="page-title">展览大厅</h1>
    <p class="page-description">浏览精美的中国结艺术作品</p>

    <div class="category-list">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-item"
        @click="selectCategory(category.id)"
        :class="{ active: activeCategory === category.id }"
      >
        {{ category.name }}
      </div>
    </div>

    <div class="knot-grid">
      <div
        v-for="knot in filteredKnots"
        :key="knot.id"
        class="knot-card"
      >
        <div class="knot-image-placeholder">
          <span>{{ knot.name }}</span>
        </div>
        <h3 class="knot-name">{{ knot.name }}</h3>
        <p class="knot-description">{{ knot.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { mockCategories } from '@/mock/categories';
import { mockKnots } from '@/mock/knots';

const categories = ref(mockCategories);
const knots = ref(mockKnots);
const activeCategory = ref('art');

const filteredKnots = computed(() => {
  return knots.value.filter(knot => knot.categoryId === activeCategory.value);
});

const selectCategory = (categoryId) => {
  activeCategory.value = categoryId;
};
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.gallery-page {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: $spacing-xl $spacing-base;
}

.page-title {
  font-size: $font-size-hero;
  color: $primary-color;
  text-align: center;
  margin-bottom: $spacing-sm;
}

.page-description {
  font-size: $font-size-lg;
  color: $text-secondary;
  text-align: center;
  margin-bottom: $spacing-xl;
}

.category-list {
  display: flex;
  justify-content: center;
  gap: $spacing-base;
  margin-bottom: $spacing-xl;
  flex-wrap: wrap;
}

.category-item {
  padding: 0.75rem 2rem;
  background: $bg-secondary;
  border: 2px solid $border-color;
  border-radius: $border-radius-base;
  cursor: pointer;
  transition: all $duration-base;
  font-size: $font-size-base;

  &:hover {
    border-color: $primary-color;
    transform: translateY(-2px);
  }

  &.active {
    background: $primary-color;
    color: #fff;
    border-color: $primary-color;
  }
}

.knot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: $spacing-lg;
}

.knot-card {
  background: $bg-secondary;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
  transition: all $duration-base;
  cursor: pointer;

  &:hover {
    box-shadow: $shadow-base;
    transform: translateY(-4px);
  }
}

.knot-image-placeholder {
  width: 100%;
  height: 280px;
  background: linear-gradient(135deg, $secondary-color 0%, $primary-color 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: $font-size-xxl;
  font-weight: bold;
}

.knot-name {
  padding: $spacing-base;
  font-size: $font-size-xl;
  color: $text-primary;
  margin: 0;
}

.knot-description {
  padding: 0 $spacing-base $spacing-base;
  color: $text-secondary;
  font-size: $font-size-base;
  line-height: 1.6;
}
</style>
