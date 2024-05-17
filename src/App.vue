<template>
  <!-- 헤더 컴포넌트 (조건부 렌더링) -->
  <AppHeader v-if="showHeader" @hide-cursor="hideCursor" @show-cursor="showCursor" />
  <!-- 페이지 컴포넌트를 렌더링할 위치 -->
  <router-view />
  <!-- 커스텀 커서 -->
  <div class="cursor_custom" v-show="isCursorVisible"></div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/Header.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  setup() {
    const route = useRoute();
    const isCursorVisible = ref(true);
    const hideCursor = () => {
      isCursorVisible.value = false;
    };
    const showCursor = () => {
      isCursorVisible.value = true;
    };

    const showHeader = computed(() => route.path !== '/guide');

    return {
      isCursorVisible,
      hideCursor,
      showCursor,
      showHeader
    };
  }
};
</script>

<style>
#app {
  width: 100%;
  min-height: 100%;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cursor_custom {
  position: fixed;
  transform: translate(-50%, -50%);
  width: 10rem;
  height: 10rem; /* Ensure the height is set */
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  cursor: none;
  z-index: 9999; /* Ensure it's above all other elements */
  pointer-events: none; /* Prevent it from blocking other elements */
}
</style>
