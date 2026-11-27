<template>
    <NuxtPage />
</template>

<script lang="ts" setup>
// 引入 View Transition 样式
import '../public/view-transition.css'
</script>

<style>
.page-enter-active {
  transition: all 0.2s;
}
.page-leave-active {
}
.page-enter-from {
  opacity: .6;
  /* filter: blur(1rem); */
  transform: translateX(60px);
}
.page-leave-to {
  transform: translateX(0px);
}
</style>