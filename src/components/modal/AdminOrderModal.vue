<template>

<div class="modal modal-lg fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="fs-5 mb-0">{{ tempOrder.id }}</h4>
                <button type="button" class="btn border-0 p-0 fs-4"
                        @click="hideModal">
                <i class="bi bi-x-circle-fill"></i>
                </button>
            </div>
            <div class="modal-body py-4">
                <ul class="nav nav-pills bg-light rounded-2 mb-3">
                    <li class="nav-item flex-grow-1">
                    <button type="button" @click="tab = 'content'"
                            class="w-100 nav-link" :class="{ 'active': tab === 'content' }">
                    訂購商品</button>
                    </li>
                    <li class="nav-item flex-grow-1">
                    <button type="button" @click="tab = 'info'"
                            class="w-100 nav-link" :class="{ 'active': tab === 'info' }">
                    客戶資訊</button>
                    </li>
                </ul>
                <div v-show="tab === 'content'">
                    <table class="table table-light">
                        <tbody>
                            <tr v-for="(item, key) in tempOrder.products" :key="key">
                            <td>{{ item.product.title }}</td>
                            <td>× {{ item.qty }} {{ item.product.unit }}</td>
                            <td class="text-end">NT$ {{ item.total }}</td>
                            </tr>
                        </tbody>
                        <tfoot class="fs-5 fw-bold">
                            <tr>
                            <td colspan="2">總計</td>
                            <td class="text-end">NT$ {{ tempOrder.total }}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <p class="mb-0">
                    <span>付款狀態：</span>
                    <span :class="tempOrder.is_paid ? 'text-success' : 'text-danger'">
                    {{ tempOrder.is_paid ? '已付款' : '未付款' }}
                    </span>
                    </p>
                </div>
                <div v-show="tab === 'info'">
                    <p>
                    <span class="badge bg-primary me-2">訂單成立日期</span>
                    {{ formatTime(tempOrder.create_at * 1000) }}
                    </p>
                    <hr>
                    <p>
                    <span class="badge bg-primary me-2">姓名</span>
                    {{ tempOrder.user.name }}
                    </p>
                    <hr>
                    <p>
                    <span class="badge bg-primary me-2">電話</span>
                    {{ tempOrder.user.tel }}
                    </p>
                    <hr>
                    <p><span class="badge bg-primary">地址</span></p>
                    <p>{{ tempOrder.user.address }}</p>
                    <hr>
                    <p><span class="badge bg-primary">信箱</span></p>
                    <p>{{ tempOrder.user.email }}</p>
                    <hr>
                    <p><span class="badge bg-primary">留言</span></p>
                    <p class="pre-wrap mb-0">{{ tempOrder.message }}</p>
                </div>
            </div>
            <div class="modal-footer" v-if="!tempOrder.is_paid">
                <button type="button" class="btn btn-highlight" @click="$emit('update-order')">
                確認結單</button>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>
.badge {

  font-size: 1rem;
  padding: 0.5rem;

}

</style>

<script>

import moment from 'moment';

import modalMixins from '@/mixins/modal';

//

export default {

    mixins: [modalMixins],

    props: ['tempOrder'],

    emits: ['update-order'],

    data() { return { modal: '', tab: 'content' }; },

    methods: {

        formatTime(time) { return moment(time).format('YYYY/MM/DD HH:mm:ss'); },

    },

};

</script>
