import axios from 'axios';

//

import { defineStore } from 'pinia';

import useLoaderStore from './loader';

import useAlertStore from './alert';

//

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

const loaderStore = useLoaderStore();

const alertStore = useAlertStore();

//

export default defineStore('adminProduct', {

    state: () => ({ products: [], currentPage: 1 }),

    getters: {

        tagsList: ({ products }) => {

            const tags = [];
            products.forEach((item) => item.tags.forEach((tag) => {

                if (!tags.includes(tag)) { tags.push(tag); }

            }));
            return tags;

        },

        totalPages: ({ products }) => Math.ceil(products.length / 5),

        // eslint-disable-next-line arrow-body-style
        displayProducts: ({ products, currentPage }) => {

            return products.filter((i, idx) => Math.floor(idx / 5) === currentPage - 1);

        },

        // productList: ({ products }) => {},

    },

    actions: {

        switchPage(num) { this.currentPage = num; },

        getProducts() {

            loaderStore.createLoader('getProducts');
            axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/products/all`)
                .then((res) => {

                    const { products } = res.data;
                    this.products = Object.values(products);
                    this.switchPage(1);

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('getProducts'));

        },

        createProduct(data, hideModal) {

            loaderStore.createLoader('createProduct');
            axios.post(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/product`, { data })
                .then((res) => {

                    const { message } = res.data;
                    alertStore.toastAlert(message, 'success');
                    hideModal();
                    this.getProducts();

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('createProduct'));

        },

        updateProduct(data, hideModal) {

            loaderStore.createLoader('updateProduct');
            axios.put(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/product/${data.id}`, { data })
                .then((res) => {

                    alertStore.toastAlert(res.data.message, 'success');
                    hideModal();
                    this.getProducts();

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('updateProduct'));

        },

        switchProductStatus(data) {

            const currentStatus = data.is_enabled;
            loaderStore.createLoader('switchProductStatus');
            axios.put(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/product/${data.id}`, {
                data: { ...data, is_enabled: !data.is_enabled },
            })
                .then(() => {

                    alertStore.toastAlert(currentStatus ? '成功下架' : '成功上架', 'success');
                    this.getProducts();

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('switchProductStatus'));

        },

        deleteProduct(id, hideModal) {

            loaderStore.createLoader('deleteProduct');
            axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/product/${id}`)
                .then(() => {

                    alertStore.toastAlert('我們懷念它 (´;ω;`)', 'success');
                    hideModal();
                    this.getProducts();

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('deleteProduct'));

        },

    },

});
