<template>
  <!-- 文字模糊淡入动画容器 -->
  <p ref="rootRef" :class="['blur-text', className, 'flex', 'flex-wrap']">
    <!-- 遍历每个文字/单词，应用独立动画 -->
    <Motion
      v-for="(segment, index) in elements"
      :key="`${animationKey}-${index}`"
      tag="span"
      :initial="fromSnapshot"
      :animate="inView ? getAnimateKeyframes() : fromSnapshot"
      :transition="getTransition(index)"
      :style="{
        display: 'inline-block',
        willChange: 'transform, filter, opacity'
      }"
      @animation-complete="() => handleAnimationComplete(index)"
    >
      {{ segment === ' ' ? '\u00A0' : segment
      }}{{ animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : '' }}
    </Motion>
  </p>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, useTemplateRef } from 'vue';
import { Motion } from 'motion-v';

// 定义组件属性
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  delay: {
    type: Number,
    default: 200  // 每个元素之间的延迟时间（毫秒）
  },
  className: {
    type: String,
    default: ''
  },
  animateBy: {
    type: String,
    default: 'words',  // 'words' 按单词动画，'letters' 按字母动画
    validator: (value) => ['words', 'letters'].includes(value)
  },
  direction: {
    type: String,
    default: 'top',  // 'top' 从上方进入，'bottom' 从下方进入
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  threshold: {
    type: Number,
    default: 0.1  // IntersectionObserver 触发阈值
  },
  rootMargin: {
    type: String,
    default: '0px'  // IntersectionObserver 根边距
  },
  animationFrom: {
    type: Object,
    default: null  // 自定义起始动画状态
  },
  animationTo: {
    type: Array,
    default: null  // 自定义结束动画状态数组
  },
  easing: {
    type: Function,
    default: (t) => t  // 缓动函数
  },
  stepDuration: {
    type: Number,
    default: 0.35  // 每步动画持续时间（秒）
  }
});

const emit = defineEmits(['animation-complete']);

/**
 * 构建关键帧动画对象
 * @param {Object} from - 起始状态
 * @param {Array} steps - 中间步骤数组
 * @returns {Object} 关键帧对象
 */
const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(step => Object.keys(step))]);
  const keyframes = {};

  for (const key of keys) {
    keyframes[key] = [from[key], ...steps.map(step => step[key])];
  }

  return keyframes;
};

// 根据动画类型分割文本
const elements = computed(() => (props.animateBy === 'words' ? props.text.split(' ') : props.text.split('')));

// 默认起始状态：模糊、透明、偏移
const defaultFrom = computed(() =>
  props.direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 }
);

// 默认动画步骤：半模糊 -> 清晰
const defaultTo = computed(() => [
  {
    filter: 'blur(5px)',
    opacity: 0.5,
    y: props.direction === 'top' ? 5 : -5
  },
  {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0
  }
]);

// 实际使用的动画状态
const fromSnapshot = computed(() => props.animationFrom ?? defaultFrom.value);
const toSnapshots = computed(() => props.animationTo ?? defaultTo.value);

// 动画步骤和时间计算
const stepCount = computed(() => toSnapshots.value.length + 1);
const totalDuration = computed(() => props.stepDuration * (stepCount.value - 1));
const times = computed(() =>
  Array.from({ length: stepCount.value }, (_, i) => (stepCount.value === 1 ? 0 : i / (stepCount.value - 1)))
);

// 状态管理
const inView = ref(false);  // 元素是否在视口中
const animationKey = ref(0);  // 动画键，用于强制重新渲染
const completionFired = ref(false);  // 是否已触发完成事件
const rootRef = useTemplateRef('rootRef');

let observer = null;

/**
 * 设置 IntersectionObserver 监听元素可见性
 */
const setupObserver = () => {
  if (!rootRef.value) return;

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true;
        observer?.unobserve(rootRef.value);
      }
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin
    }
  );

  observer.observe(rootRef.value);
};

/**
 * 获取动画关键帧
 */
const getAnimateKeyframes = () => {
  return buildKeyframes(fromSnapshot.value, toSnapshots.value);
};

/**
 * 获取每个元素的过渡配置
 * @param {Number} index - 元素索引
 */
const getTransition = (index) => {
  return {
    duration: totalDuration.value,
    times: times.value,
    delay: (index * props.delay) / 1000,  // 延迟递增
    ease: props.easing
  };
};

/**
 * 处理单个元素动画完成
 * @param {Number} index - 元素索引
 */
const handleAnimationComplete = (index) => {
  // 只在最后一个元素完成时触发一次
  if (index === elements.value.length - 1 && !completionFired.value) {
    completionFired.value = true;
    emit('animation-complete');
  }
};

onMounted(() => {
  setupObserver();
});

onUnmounted(() => {
  observer?.disconnect();
});

// 监听配置变化，重新设置观察器
watch([() => props.threshold, () => props.rootMargin], () => {
  observer?.disconnect();
  setupObserver();
});

// 监听动画参数变化，重置动画
watch([() => props.delay, () => props.stepDuration, () => props.animateBy, () => props.direction], () => {
  animationKey.value++;
  completionFired.value = false;
});
</script>

<style scoped>
.blur-text {
  margin: 0;
}

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}
</style>
