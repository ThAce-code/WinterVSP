<template>
  <p ref="rootRef" :class="['blur-text', className, 'flex', 'flex-wrap']">
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

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  delay: {
    type: Number,
    default: 200
  },
  className: {
    type: String,
    default: ''
  },
  animateBy: {
    type: String,
    default: 'words',
    validator: (value) => ['words', 'letters'].includes(value)
  },
  direction: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  threshold: {
    type: Number,
    default: 0.1
  },
  rootMargin: {
    type: String,
    default: '0px'
  },
  animationFrom: {
    type: Object,
    default: null
  },
  animationTo: {
    type: Array,
    default: null
  },
  easing: {
    type: Function,
    default: (t) => t
  },
  stepDuration: {
    type: Number,
    default: 0.35
  }
});

const emit = defineEmits(['animation-complete']);

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(step => Object.keys(step))]);
  const keyframes = {};

  for (const key of keys) {
    keyframes[key] = [from[key], ...steps.map(step => step[key])];
  }

  return keyframes;
};

const elements = computed(() => (props.animateBy === 'words' ? props.text.split(' ') : props.text.split('')));

const defaultFrom = computed(() =>
  props.direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 }
);

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

const fromSnapshot = computed(() => props.animationFrom ?? defaultFrom.value);
const toSnapshots = computed(() => props.animationTo ?? defaultTo.value);

const stepCount = computed(() => toSnapshots.value.length + 1);
const totalDuration = computed(() => props.stepDuration * (stepCount.value - 1));
const times = computed(() =>
  Array.from({ length: stepCount.value }, (_, i) => (stepCount.value === 1 ? 0 : i / (stepCount.value - 1)))
);

const inView = ref(false);
const animationKey = ref(0);
const completionFired = ref(false);
const rootRef = useTemplateRef('rootRef');

let observer = null;

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

const getAnimateKeyframes = () => {
  return buildKeyframes(fromSnapshot.value, toSnapshots.value);
};

const getTransition = (index) => {
  return {
    duration: totalDuration.value,
    times: times.value,
    delay: (index * props.delay) / 1000,
    ease: props.easing
  };
};

const handleAnimationComplete = (index) => {
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

watch([() => props.threshold, () => props.rootMargin], () => {
  observer?.disconnect();
  setupObserver();
});

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
