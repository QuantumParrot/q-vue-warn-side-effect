<template>

<div class="text-end mb-5">
<h3 class="fs-2 mb-3">商品管理</h3>
<p class="fs-6 text-muted">
<span>目前共有 {{ products.length }} 項商品，</span>
<span>{{ products.filter((i) => i.is_enabled).length }} 項上架中</span></p>
</div>

<div class="row justify-content-between g-3 mb-5">
    <div class="col-md-4">
        <div class="h-100 alert bg-light flex-classic mb-0">
            <button type="button" class="w-100 btn btn-primary me-3" @click="openModal">
            <i class="bi bi-plus-lg me-1"></i>
            新增商品</button>
            <button type="button" class="w-100 btn btn-primary"
                    @click="$refs.uploadModal.showModal">
            <i class="bi bi-upload me-1"></i>
            上傳圖片</button>
        </div>
    </div>
    <div class="col-md-8">
        <div class="h-100 alert bg-light d-flex justify-content-end mb-0">
            <pagination-component
                :total="totalPages" :current="currentPage"
                @switch-page="switchPage" />
        </div>
    </div>
</div>

<table class="table table-hover" v-if="products.length">
    <thead>
        <tr>
        <th width="10%">分類</th>
        <th width="40%">名稱</th>
        <th width="10%" class="text-end">原價</th>
        <th width="10%" class="text-end">售價</th>
        <th width="15%" class="text-center">狀態</th>
        <th width="15%" class="text-center">管理</th>
        </tr>
    </thead>
    <tbody>
        <template v-for="product in displayProducts" :key="product.id">
            <tr class="align-middle">
                <td>
                <span class="badge bg-highlight text-dark py-2">{{ product.category }}</span>
                </td>
                <td>{{ product.title }}</td>
                <td class="text-end">$ {{ product.origin_price }}</td>
                <td class="text-end">$ {{ product.price }}</td>
                <td class="text-center">
                    <div class="form-switch">
                        <input type="checkbox" role="switch" class="form-check-input"
                               :checked="product.is_enabled"
                               @change="switchProductStatus(product)">
                    </div>
                </td>
                <td class="text-center">
                    <div class="d-flex flex-column gap-2">
                        <button type="button" class="btn btn-outline-primary"
                                @click="openModal(product, 'update')">
                        編輯</button>
                        <button type="button" class="btn btn-outline-danger"
                                @click="openModal(product, 'delete')">
                        刪除</button>
                    </div>
                </td>
            </tr>
        </template>
    </tbody>
</table>

<div class="alert bg-light" v-else>還沒有任何商品！趕快建立一個吧！</div>

<upload-modal ref="uploadModal" />
<admin-product-modal ref="productModal" :temp-product="tempProduct" />
<delete-modal ref="deleteModal" :target="tempProduct" target-genre="product"
              @delete-target="deleteProduct(tempProduct.id, $refs.deleteModal.hideModal)" />

</template>

<script>

import { mapState, mapActions } from 'pinia';

import adminProductStore from '@/stores/adminProduct';

//

import PaginationComponent from '@/components/PaginationComponent.vue';

import AdminProductModal from '@/components/modal/AdminProductModal.vue';

import UploadModal from '@/components/modal/UploadModal.vue';

import DeleteModal from '@/components/modal/DeleteModal.vue';

//

export default {

    components: {

        PaginationComponent,
        AdminProductModal,
        UploadModal,
        DeleteModal,

    },

    data() { return { tempProduct: {} }; },

    computed: {

        ...mapState(adminProductStore, ['products', 'displayProducts', 'currentPage', 'totalPages']),

    },

    methods: {

        ...mapActions(adminProductStore, ['switchPage', 'getProducts', 'switchProductStatus', 'deleteProduct']),

        openModal(item, type) {

            this.tempProduct = { ...item };

            if (type === 'delete') {

                this.$refs.deleteModal.showModal();

            } else { this.$refs.productModal.showModal(); }

        },

    },

    created() { this.getProducts(); },

};

</script>
