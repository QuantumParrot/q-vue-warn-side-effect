<template>

<nav class="h-100 d-flex flex-column justify-content-between">
    <div class="flex-grow-1">
        <h2 class="text-center mb-5">後台管理</h2>
        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link class="nav-link" to="/admin">
                <i class="bi bi-pie-chart-fill me-3"></i>
                首頁</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/product">
                <i class="bi bi-box-seam-fill me-3"></i>
                商品</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/order">
                <i class="bi bi-file-earmark-text me-3"></i>
                訂單</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/article">
                <i class="bi bi-pencil-square me-3"></i>
                文章</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/coupon">
                <i class="bi bi-percent me-3"></i>
                優惠券</router-link>
            </li>
        </ul>
    </div>
    <div class="border-top pt-4">
        <button type="button" class="btn btn-highlight" @click="logout">登出</button>
    </div>
</nav>

</template>

<style lang="scss" scoped>

@import '@/assets/_variables.scss';

.nav-link {

  color: $light;
  padding: 1rem;

  &:hover {

    color: $primary;
    background-color: $light;

  }

  &.active {

    color: $primary;
    background-color: $light;

  }

}

</style>

<script>

import { mapActions } from 'pinia';

import adminAuthStore from '@/stores/adminAuth';

export default {

    methods: {

        ...mapActions(adminAuthStore, ['logout']),

    },

};

</script>
