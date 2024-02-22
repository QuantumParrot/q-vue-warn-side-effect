<template>

<loading-overlay :is-loading="isLoading" />

<div class="container-fluid h-100" v-if="isLogin">
    <div class="row h-100">
        <div class="col-md-3 bg-primary text-white">
            <div class="container h-100 py-4">
            <admin-sidebar></admin-sidebar>
            </div>
        </div>
        <div class="col-md-9">
            <div class="container h-100 py-4">
            <router-view></router-view>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import { mapState, mapActions } from 'pinia';

import adminAuthStore from '@/stores/adminAuth';

import loaderStore from '@/stores/loader';

//

import AdminSidebar from '@/components/AdminSidebar.vue';

//

export default {

    components: { AdminSidebar },

    computed: {

        ...mapState(adminAuthStore, ['isLogin']), ...mapState(loaderStore, ['isLoading']),

    },

    methods: {

        ...mapActions(adminAuthStore, ['checkLogin']),

    },

    created() { this.checkLogin(); },

};

</script>
