<template>
    <section class="container">
        <div class="board">
            <ul>
                <li class="table-header">
                    <span class="col">제목</span>
                    <span class="col">글쓴이</span>
                    <span class="col">날짜</span>
                </li>
                <li v-for="(item, index) in boardList" :key="index" class="table-row">
                    <span class="col">{{ item.title }}</span>
                    <span class="col">{{ item.author }}</span>
                    <span class="col">{{ item.date }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
    name: 'AppBooks',
    data() {
        return {
        boardList: [
            { title: 'Vue.js Guide', author: 'Evan You', date: '2024-05-15' },
            { title: 'JavaScript Essentials', author: 'John Doe', date: '2024-04-20' },
            { title: 'Web Development', author: 'Jane Smith', date: '2024-03-10' },
        ]
        }
    }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/variables';
    @import '@/assets/styles/mixins';

    .container {
        .board {
            width: 100%;
            max-width: 140rem;
            margin: 0 auto;

            ul {
                border: 1px solid #ccc;
                li {
                    display: flex;
                    justify-content: center;

                }
                .table-header {
                    .col {
                        flex: 1;
                    }
                }

                .table-row {
                    .col {
                        flex: 1;
                    }
                }
            }
        }
    }
</style>
