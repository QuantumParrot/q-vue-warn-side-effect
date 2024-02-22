<template>

<div class="text-end mb-5">
<h3 class="fs-2 mb-3">訂單管理</h3>
<p class="fs-6 text-muted">
<span>目前共有 {{ orders.length }} 筆訂單，</span>
<span>尚有 {{ orders.filter((i) => !i.is_paid).length }} 筆未結單</span></p>
</div>

<template v-if="orders.length">

<div class="alert bg-light flex-classic mb-5">
    <div class="d-flex gap-2">
    <input type="checkbox" id="unlock" class="btn-check" v-model="deletePermission">
    <label for="unlock" class="btn btn-outline-primary">
    <i class="bi" :class="deletePermission ? 'bi-unlock-fill' : 'bi-lock-fill'"></i>
    </label>
    <button type="button" class="btn btn-danger" v-if="deletePermission"
            @click="deleteAllOrders">刪除所有訂單</button>
    </div>
    <pagination-component
        :current="currentPage" :total="totalPages"
        @switch-page="switchPage" />
</div>

<table class="table table-hover">
    <thead>
        <tr>
        <th width="10%">成立日期</th>
        <th width="50%">詳細</th>
        <th width="30%" class="text-end">
        總額</th>
        <th width="10%" class="text-center">處理</th>
        </tr>
    </thead>
    <tbody>
        <template v-for="order in orders" :key="order.id">
            <tr class="align-middle">
                <td>{{ formatTime(order.create_at * 1000) }}</td>
                <td>
                <span class="badge me-3" :class="order.is_paid ? 'bg-success' : 'bg-danger'">
                {{ order.is_paid ? '已付款' : '未付款' }}
                </span>
                <a href="#" @click.prevent="openModal(order)">
                    <span class="me-2">{{ order.user.name }}</span>
                    <i class="bi bi-search"></i>
                </a>
                </td>
                <td class="text-end">NT$ {{ order.total }}</td>
                <td class="text-center">
                <button type="button" class="btn btn-outline-danger"
                        :disabled="!deletePermission" @click="$refs.deleteModal.showModal">
                <span class="spinner-border spinner-border-sm me-2"
                      role="status" aria-hidden="true" v-if="loadingItem === order.id"></span>
                刪除</button>
                </td>
            </tr>
        </template>
    </tbody>
</table>

</template>

<div class="alert bg-light" v-else>還沒有任何訂單～</div>

<admin-order-modal ref="orderModal" :temp-order="tempOrder"
                   @update-order="updateOrder(tempOrder, $refs.orderModal.hideModal)" />
<delete-modal ref="deleteModal" :target="tempOrder" target-genre="order"
              @delete-target="deleteOrder(tempOrder.id, $refs.deleteModal.hideModal)" />

</template>

<script>

import moment from 'moment';

//

import PaginationComponent from '@/components/PaginationComponent.vue';

import AdminOrderModal from '@/components/modal/AdminOrderModal.vue';

import DeleteModal from '@/components/modal/DeleteModal.vue';

//

import { mapState, mapActions } from 'pinia';

import loaderStore from '@/stores/loader';

import adminOrderStore from '@/stores/adminOrder';

//

export default {

    components: { PaginationComponent, AdminOrderModal, DeleteModal },

    data() {

        return {

            tempOrder: { user: {}, products: {} },
            deletePermission: false,

        };

    },

    computed: {

        ...mapState(adminOrderStore, ['orders', 'currentPage', 'totalPages']),

        ...mapState(loaderStore, ['loadingItem']),

    },

    methods: {

        ...mapActions(adminOrderStore, ['getOrders', 'switchPage', 'updateOrder', 'deleteOrder', 'deleteAllOrders']),

        formatTime(timestamp) { return moment(timestamp).format('YYYY/MM/DD'); },

        openModal(order) {

            this.tempOrder = { ...order };
            this.$refs.orderModal.showModal();

        },

    },

    mounted() { this.getOrders(); },

};

</script>
