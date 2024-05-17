<template>
  <section id="wrapper">
    <div class="inner">
      <div class="visual">
        <!-- Swiper 적용 영역 -->
        <div v-if="currentMessage === 1" class="slide slide-1">
          <swiper
            :slides-per-view="slidesPerView"
            :loop="true"
            :space-between="20"
            class="mySwiper"
            :autoplay="{ delay: 500, disableOnInteraction: false }"
          >
            <swiper-slide v-for="(image, index) in images" :key="index">
              <img :src="image" alt="slide image" />
            </swiper-slide>
          </swiper>
        </div>

        <!-- 텍스트 애니메이션 영역 -->
        <div v-else-if="currentMessage === 2" class="slide slide-2">
          <div v-for="(text, index) in texts" :key="index" :class="['animated-text', `text-${index}`]">
            <div>{{ text }}</div>
          </div>
        </div>

        <!-- 기존 메시지 표시 코드 -->
        <div v-else :class="['slide', slideClass(currentMessage)]">
          <div>{{ message }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: 'AppHome',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      currentMessage: 0,
      messages: [
        "책은 한 권 한 권이 하나의 세계다",
        "",
        "환영합니다",
        ""
      ],
      images: [
        require('@/assets/images/book_cover_01.jpeg'),
        require('@/assets/images/book_cover_02.jpeg'),
        require('@/assets/images/book_cover_03.jpeg'),
        require('@/assets/images/book_cover_04.jpeg'),
        require('@/assets/images/book_cover_05.jpeg'),
        require('@/assets/images/book_cover_06.jpeg'),
      ],
      texts: [
        "마크툽",
        "도망쳐서 도착한 곳에 낙원은 없다.",
        "네 사랑이 무사하기를. 내 사랑도 무사하니까.",
        "바다는 비에 젖지 않는다.",
        "사막이 아름다운 것은 어디엔가 샘을 숨기고 있기 때문이야."
      ],
      slidesPerView: 3 // 기본값
    };
  },
  computed: {
    message() {
      return this.messages[this.currentMessage];
    },
    slideClass() {
      return index => `slide-${index}`;
    }
  },
  setup() {
    const isCursorVisible = inject('isCursorVisible');
    const hideCursor = inject('hideCursor');
    const showCursor = inject('showCursor');
    return {
      isCursorVisible,
      hideCursor,
      showCursor
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.onResize); // 추가된 부분
    this.handleMouse();
    this.onResize(); // 초기 로드 시 화면 크기에 따라 설정
  },
  beforeUnmount() { // 추가된 부분
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.onResize); // 추가된 부분
    window.removeEventListener('mousemove', this.animateCursor);
  },
  methods: {
    handleScroll() {
      const windowHeight = window.innerHeight;
      const headerHeight = document.querySelector('header').offsetHeight; // 헤더의 높이 가져오기

      const scrollY = window.scrollY;
      const adjustedWindowHeight = windowHeight - headerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const threshold1 = adjustedWindowHeight / 2;

      if (scrollY < threshold1) {
        this.currentMessage = 0;
      } else if (scrollY >= threshold1 && scrollY < documentHeight - windowHeight) {
        this.currentMessage = 1;
      } else {
        this.currentMessage = 2;
      }
    },
    handleMouse() {
      const mouseCursor = document.querySelector('.cursor_custom');
      this.animateCursor = (e) => {
        mouseCursor.style.left = `${e.clientX}px`;
        mouseCursor.style.top = `${e.clientY}px`;
      };
      window.addEventListener('mousemove', this.animateCursor);
    },
    onResize() { // 추가된 부분
      if(window.innerWidth <= 768) { // medium 이하 화면 크기
        this.slidesPerView = 1;
      } else {
        this.slidesPerView = 3;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

@font-face {
  font-family: 'BookkMyungjo-Bd';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/BookkMyungjo-Bd.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  25% { opacity: 1; }
  75% { opacity: 1; }
  100% { opacity: 0; }
}

#wrapper {
  min-height: 350vh;
  
  cursor: none; /* Hide the default mouse cursor */
  .inner {
    width: 100%;
    .visual {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(252,245,236,1) 0%, rgba(189,223,246,1) 100%);
      animation: gradient 5s ease infinite;
      background-size: 400% 400%;

      .slide {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
      }

      .slide-0 {
        font-size: 5.0rem;
        font-family: 'BookkMyungjo-Bd';
      }

      .slide-1 {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 45rem;

        img {
          width: auto;
          height: 100%;
        }
      }

      .slide-2 {
        position: relative;
        width: 100%;
        height: 100%;
        font-family: 'BookkMyungjo-Bd';
      }

      .animated-text {
        position: absolute;
        font-size: 2rem;
        opacity: 0;
        animation: fadeInOut 5s infinite;
      }

      .text-0 { 
        top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 5rem; animation-delay: 0s; 
      }
      .text-1 { 
        top: 15%; left: 10%; animation-delay: 1s; 
      }
      .text-2 { 
        top: 28%; left: 20%; font-size: 4rem; animation-delay: 2s; 
      }
      .text-3 { 
        top: 78%; left: 18%; font-size: 1.8rem; animation-delay: 3s; 
      }
      .text-4 { 
        top: 67%; left: 45%; font-size: 2.2rem; animation-delay: 4s; 
      }

      @include respond-to('large') {
        padding: 0 2rem;
        box-sizing: border-box;
        overflow: hidden;

        .slide-0 {
          font-size: 2.5rem;
        }
        .slide-1 {
          height: initial;
          img {
            width: 100%;
          }
          :deep(.swiper-wrapper) {
            align-items: flex-end;
            height: auto;
          }
        }
        .text-0 {
          font-size: 4rem;
        }
        .text-1 {
          font-size: 2rem;
        }
        .text-2 {
          font-size: 2.5rem;
        }
        .text-3 {
          font-size: 1.8rem;
        }
        .text-4 {
          font-size: 1.5rem;
        }
      }

      @include respond-to('meduim') {
        .slide-1 {
          
          img {
            max-width: calc(100% - 50%);
            width: 100%;
          }
        }
      }

      @include respond-to('small') {
        .slide-0 {
          font-size: 2.2rem;
        }
        .text-0 {
          font-size: 2rem;
        }
        .text-1 {
          font-size: 1.2rem;
        }
        .text-2 {
          font-size: 1.5rem;
        }
        .text-3 {
          font-size: 1.2rem;
        }
        .text-4 {
          top: 61%;
          font-size: 1.6rem;
        }
      }
    }
  }
}

</style>
