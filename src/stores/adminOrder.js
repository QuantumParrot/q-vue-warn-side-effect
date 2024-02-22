import axios from 'axios';

//

import { defineStore } from 'pinia';

import useLoaderStore from './loader';

import useAlertStore from './alert';

//

const loaderStore = useLoaderStore();

const alertStore = useAlertStore();

const { VITE_APP_SITE, VITE_APP_PATH } = import.meta.env;

//

export default defineStore('adminOrder', {

    state: () => ({ orders: [], currentPage: 1 }),

    getters: {

        totalPages: ({ orders }) => Math.ceil(orders.length / 5),

    },

    actions: {

        switchPage(num) { this.currentPage = num; },

        getOrders() {

            loaderStore.createLoader('getOrders');
            axios.get(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/orders`)
                .then((res) => {

                    this.orders = res.data.orders;
                    this.switchPage(1);

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('getOrders'));

        },

        updateOrder(data, hideModal) {

            loaderStore.createLoader('updateOrder');
            axios.put(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/order/${data.id}`, {
                data: { ...data, is_paid: !data.is_paid },
            })
                .then((res) => {

                    alertStore.toastAlert(res.data.message, 'success');
                    hideModal();
                    this.getOrders();

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('updateOrder'));

        },

        deleteOrder(id, hideModal) {

            loaderStore.createLoader('deleteOrder');
            axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/order/${id}`)
                .then(() => {

                    alertStore.toastAlert('我們懷念它 (´;ω;`)', 'success');
                    hideModal();
                    this.getOrders();

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('deleteOrder'));

        },

        deleteAllOrders() {

            alertStore.multiverseAlert(this.downTheDrain);

        },

        downTheDrain() {

            loaderStore.createLoader('deleteAllOrders');
            axios.delete(`${VITE_APP_SITE}/api/${VITE_APP_PATH}/admin/orders/all`)
                .then(() => {

                    alertStore.toastAlert('沒了 ... 都沒了 (´;ω;`)', 'success');
                    this.getOrders();

                })
                .catch((error) => alertStore.errorAlert(error))
                .finally(() => loaderStore.removeLoader('deleteAllOrders'));

        },

    },

});
