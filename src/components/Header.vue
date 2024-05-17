<template>
    <header class="header" @mouseenter="hideCursor" @mouseleave="showCursor">
        <div class="inner_wrap">
            <h1 class="logo">
                <router-link to="/">BooK</router-link>
            </h1>
            <nav id="gnb">
                <ul>
                    <li v-for="item in gnbItems" :key="item.path">
                        <router-link :to="item.path">
                            <i :class="item.icon"></i>
                            <span class="sr-only">{{ item.text }}</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
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
            ]
        }
    },
    methods: {
        hideCursor() {
            this.$emit('hide-cursor');
        },
        showCursor() {
            this.$emit('show-cursor');
        }
    }
}
</script>

<style lang="scss" scoped>
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
        .logo {
        }
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
    }
}
</style>
