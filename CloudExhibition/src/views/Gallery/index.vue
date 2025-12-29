<template>
  <div class="gallery-page">
    <div class="sidebar">
      <img src="@/assets/images/bg/bamboo_slip (1).png" alt="竹简" class="bamboo-slip" />
      <div class="button-group">
        <div class="bamboo-button" v-for="index in 4" :key="index">
          <img src="@/assets/images/bg/galleery_button.png" alt="按钮" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.gallery-page {
  min-height: 100vh;
  background-image: url('@/assets/images/bg/Gallery_background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  overflow-x: hidden;
}

.sidebar {
  width: auto;
  height: 100vh;
  position: fixed;
  left: -20px;
  top: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  pointer-events: none;
  position: relative;
}

.bamboo-slip {
  height: 102vh;
  width: 450px;
  object-fit: fill;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3));
}

.button-group {
  position: absolute;
  left: 96px;
  top: 53%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 4.0rem;
  pointer-events: auto;
}

.bamboo-button {
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;

  img {
    width: 260px;
    height: auto;
    display: block;
    filter: drop-shadow(3px 5px 8px rgba(0, 0, 0, 0.4));
  }

  &:hover {
    transform: scale(1.08);
    filter: drop-shadow(4px 6px 10px rgba(0, 0, 0, 0.5));
  }
}
</style>
