<template>
    <header class="header" @mouseenter="hideCursor" @mouseleave="showCursor">
        <div class="inner_wrap">
            <h1 class="logo">
                <router-link to="/">BooK</router-link>
            </h1>
            <nav id="gnb">
                <ul v-show="!isMobileMenu || !showMobileMenu">
                <li v-for="item in gnbItems" :key="item.path">
                    <router-link :to="item.path">
                    <i :class="item.icon"></i>
                    <span class="sr-only">{{ item.text }}</span>
                    </router-link>
                </li>
                </ul>
            </nav>
            <button class="hamburger" @click="toggleMobileMenu" v-show="isMobileMenu">
                <i class="fa-solid fa-bars"></i>
            </button>
            <div class="sitemap" v-show="showMobileMenu">
                <ul>
                <li v-for="item in gnbItems" :key="item.path">
                    <router-link :to="item.path" @click="toggleMobileMenu">
                    {{ item.text }}
                    </router-link>
                </li>
                </ul>
            </div>
        </div>
    </header>
</template>

    <script>
    export default {
    name: 'AppHeader',
    data() {
        return {
        gnbItems: [
            { text: 'Books', path: "/books", icon: 'fa-solid fa-heart' },
            { text: 'Search', path: "/search", icon: 'fa-solid fa-magnifying-glass' },
            { text: 'Login', path: "/login", icon: 'fa-solid fa-user' },
        ],
        showMobileMenu: false,
        isMobileMenu: window.innerWidth < 768
        };
    },
    methods: {
        handleResize() {
        this.isMobileMenu = window.innerWidth < 768;
        if (!this.isMobileMenu) {
            this.showMobileMenu = false;
        }
        },
        hideCursor() {
        this.$emit('hide-cursor');
        },
        showCursor() {
        this.$emit('show-cursor');
        },
        toggleMobileMenu() {
        this.showMobileMenu = !this.showMobileMenu;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.header {
    position: sticky;
    top: 0;
    z-index: 1000;
    .inner_wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        #gnb {
            ul {
                display: flex;
                list-style: none;
                li {
                &:not(:last-child) {
                    margin-right: 1rem;
                }
                i {
                    font-size: 2.2rem;
                    color: #222;
                }
                }
            }
        }

        .hamburger {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
        }
        .sitemap {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100vh;
            background: #fff;
            padding: 1rem;
            overflow-y: hidden;
            ul {
                list-style: none;
                li {
                margin-bottom: 1rem;
                }
            }
        }

        @media (max-width: 767px) {
            .logo {
                font-size: 2.2rem;
            }
            #gnb {
                ul {
                display: none;
                }
            }

            .hamburger {
                display: block;
                font-size: 2.2rem;
            }

            .sitemap {
                display: block;
            }
        }
    }
}
</style>
