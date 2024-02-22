<template>

<div class="modal modal-lg fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
        <loading-overlay :is-loading="uploadState" :is-full="false" />
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="mb-0">{{ title ? title : '新增商品' }}</h4>
                <button type="button"
                        class="btn border-0 p-0 fs-4"
                        @click="hideModal">
                <i class="bi bi-x-circle-fill"></i>
                </button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-pills bg-light rounded-2 mb-3">
                    <li class="nav-item flex-grow-1">
                    <button type="button" @click="tab = 'content'"
                            class="w-100 nav-link" :class="{ 'active': tab === 'content' }">
                    商品內容</button>
                    </li>
                    <li class="nav-item flex-grow-1">
                    <button type="button" @click="tab = 'description'"
                            class="w-100 nav-link" :class="{ 'active': tab === 'description' }">
                    商品介紹</button>
                    </li>
                    <li class="nav-item flex-grow-1">
                    <button type="button" @click="tab = 'price'"
                            class="w-100 nav-link" :class="{ 'active': tab === 'price' }">
                    商品售價</button>
                    </li>
                    <li class="nav-item flex-grow-1">
                    <button type="button" @click="tab = 'tags'"
                            class="w-100 nav-link" :class="{ 'active': tab === 'tags' }">
                    商品標籤</button>
                    </li>
                    <li class="nav-item flex-grow-1">
                    <button type="button" @click="tab = 'image'"
                            class="w-100 nav-link" :class="{ 'active': tab === 'image' }">
                    商品圖片</button>
                    </li>
                </ul>
                <form class="p-3 border rounded-2">
                    <template v-if="tab === 'content'">
                        <div class="mb-3">
                        <label class="form-label" for="title">
                        商品名稱</label>
                        <input type="text" id="title"
                               class="form-control" v-model.trim="product.title">
                        </div>
                        <div class="mb-3">
                        <label class="form-label" for="subtitle">
                        商品別名</label>
                        <input type="text" id="subtitle"
                               class="form-control" v-model.trim="product.subtitle">
                        </div>
                        <div class="mb-3">
                        <label class="form-label" for="content">
                        商品規格</label>
                        <input type="text" id="content"
                               class="form-control" v-model.trim="product.content">
                        </div>
                        <div class="row row-cols-2">
                            <div class="col">
                                <label class="form-label" for="category">
                                商品分類</label>
                                <input type="text" id="category"
                                       class="form-control" v-model.trim="product.category">
                            </div>
                            <div class="col">
                                <label class="form-label" for="unit">
                                商品單位</label>
                                <input type="text" id="unit"
                                       class="form-control" v-model.trim="product.unit">
                            </div>
                        </div>
                    </template>
                    <template v-if="tab === 'description'">
                        <div>
                        <label class="form-label" for="description">
                        商品介紹</label>
                        <textarea id="description" class="form-control"
                                  rows="10" v-model.trim="product.description"></textarea>
                        </div>
                    </template>
                    <template v-if="tab === 'price'">
                        <div class="mb-3">
                        <label class="form-label" for="origin_price">
                        商品原價</label>
                        <input id="origin_price" type="number" class="form-control"
                               v-model.number="product.origin_price" min="1">
                        </div>
                        <div>
                        <label class="form-label" for="price">
                        商品售價</label>
                        <input id="price" type="number" class="form-control"
                               v-model.number="product.price" min="1">
                        </div>
                    </template>
                    <template v-if="tab === 'tags'">
                        <div>
                        <p>商品標籤</p>
                        <div class="d-flex gap-2 flex-wrap mb-3">
                            <template v-for="tag in tagsList" :key="tag">
                                <button type="button"
                                        class="btn btn-origin" @click="product.tags.push(tag)">
                                <span class="badge p-2 bg-subtle text-primary fs-6">{{ tag }}</span>
                                </button>
                            </template>
                        </div>
                        <div class="row g-3 mb-3">
                            <div class="col-md-3 position-relative"
                                 v-for="(tag, idx) in product.tags" :key="tag">
                            <input type="text" class="form-control" v-model="product.tags[idx]">
                            <button type="button" class="btn btn-origin btn-inline"
                                    @click="product.tags.splice(idx, 1)">
                            <i class="bi bi-x-lg"></i></button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary"
                                @click="product.tags.push('')">
                        新增標籤</button>
                        </div>
                    </template>
                    <template v-if="tab === 'image'">
                        <div class="mb-3">
                        <label class="form-label" for="imageUrl">
                        主圖網址</label>
                        <input id="imageUrl" type="text" class="form-control mb-3"
                               v-model.trim="product.imageUrl">
                        <img :src="product.imageUrl" :alt="product.title" v-if="product.imageUrl">
                        </div>
                        <div class="mb-3" v-if="product.imagesUrl.length">
                            <p>副圖網址</p>
                            <div class="row g-3">
                            <template v-for="(img, idx) in product.imagesUrl" :key="img">
                                <div class="col-md-6 position-relative">
                                    <input type="text" class="form-control pe-5"
                                           v-model.trim="product.imagesUrl[idx]">
                                    <button type="button" class="btn btn-origin btn-inline"
                                            @click="product.imagesUrl.splice(idx, 1)">
                                    <i class="bi bi-x-lg"></i>
                                    </button>
                                    <img class="mt-3" :src="img" :alt="product.title" v-if="img">
                                </div>
                            </template>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary mb-3"
                                @click="product.imagesUrl.push('')"
                                :disabled="product.imagesUrl.length > 4">
                        新增圖片</button>
                    </template>
                </form>
                <div class="p-3 border rounded-2 mt-3" v-show="tab === 'image'">
                    <h5 class="fw-bold mb-3">上傳圖片</h5>
                    <upload-form
                        v-if="product.imagesUrl.length < 5"
                        :clipboardVisible="false" :upload-state="uploadState"
                        @add-new-image="addNewImage"
                        @update-upload-state="updateState" />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="confirmUpdate">確認更新</button>
                <button type="button" class="btn btn-outline-secondary"
                        @click="hideModal">取消</button>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.btn-inline {

  top: .45rem; right: 1.25rem;

}

</style>

<script>

import modalMixns from '@/mixins/modal';

//

import { mapState, mapActions } from 'pinia';

import adminProductStore from '@/stores/adminProduct';

//

import UploadForm from '../UploadForm.vue';

export default {

    components: { UploadForm },

    mixins: [modalMixns],

    props: ['tempProduct'],

    data() {

        return {
            modal: '',
            title: '',
            tab: 'content',
            product: { imagesUrl: [], tags: [] },
            uploadState: false,
        };

    },

    computed: { ...mapState(adminProductStore, ['tagsList']) },

    watch: { tempProduct() { this.updateData(); } },

    methods: {

        ...mapActions(adminProductStore, ['createProduct', 'updateProduct']),

        updateData() {

            this.product = this.tempProduct;
            this.title = this.tempProduct.title;

            const { imagesUrl, tags } = this.tempProduct;
            this.product.imagesUrl = Array.isArray(imagesUrl) ? [...imagesUrl] : [];
            this.product.tags = Array.isArray(tags) ? [...tags] : [];

            this.tab = 'content';

        },

        addNewImage(url) {

            if (this.product.imageUrl) {

                this.product.imagesUrl.push(url);

            } else {

                this.product.imageUrl = url;

            }

        },

        confirmUpdate() {

            // 刪除 imagesUrl / tags 陣列中的空值

            this.product.imagesUrl = this.product.imagesUrl.filter((i) => i);
            this.product.tags = this.product.tags.filter((i) => i);

            if (this.product.id) {

                this.updateProduct(this.product, this.hideModal);

            } else {

                this.createProduct(this.product, this.hideModal);

            }

        },

        updateState(state) { this.uploadState = state; },

    },

    mounted() { this.updateData(); },

};

</script>
