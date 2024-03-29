/* eslint-disable consistent-return */

import Swal from 'sweetalert2';

//

import { defineStore } from 'pinia';

//

export default defineStore('alert', {

    actions: {

        toastAlert(text, icon) {

            Swal.fire({
                icon,
                text,
                toast: true,
                timer: 1500,
                showConfirmButton: false,
            });

        },

        modalAlert(config) {

            const { title, text, icon = 'error' } = config;
            Swal.fire({
                title,
                icon,
                text: text || '',
                confirmButtonColor: '#c62828',
            });

        },

        errorAlert(error, icon = 'warning') {

            console.log(error);
            if (error.code === 'ERR_NETWORK') {

                this.modalAlert({ title: '網路連線異常，請重新確認連線狀態後再嘗試', icon: 'error' });

            } else if (error.response) {

                const { message } = error.response.data;
                this.toastAlert(message, icon);

            }

        },

        uploadAlert(file) {

            let text = '';
            const typeRegex = /jpg|jpeg|png/g;
            if (!file.name) {

                text = '欄位不可空白';
                this.toastAlert(text, 'warning');

            } else if (!file.type.startsWith('image/')) {

                text = '須為圖片檔案';
                this.toastAlert(text, 'warning');

            } else if (!typeRegex.test(file.name.split('.')[1])) {

                text = '不支援此格式';
                this.toastAlert(text, 'warning');

            } else if (file.size > 3000000) {

                text = '檔案容量過大';
                this.toastAlert(text, 'warning');

            } else {

                return true;

            }

        },

        multiverseAlert(irreparableFn) {

            const icon = 'warning';
            const cancelButtonText = '不要好了';

            Swal.fire({
                icon,
                title: '你確定？',
                text: '刪除全部訂單 ... 不要想不開欸！',
                showCancelButton: true,
                cancelButtonText,
                confirmButtonText: '確定',
            }).then((result) => {

                if (result.isConfirmed) {

                    Swal.fire({
                        icon,
                        title: '你真的確定？',
                        text: '欸 ... 不是，全部訂單欸？',
                        showCancelButton: true,
                        cancelButtonText,
                        confirmButtonText: '對啦',
                    }).then((result2) => {

                        if (result2.isConfirmed) {

                            Swal.fire({
                                icon,
                                title: '你真的真的確定？',
                                text: '這是最後一次詢問，按下就無法回頭了',
                                showCancelButton: true,
                                cancelButtonText,
                                confirmButtonText: '確定啦，你好囉唆欸',
                            }).then((result3) => {

                                if (result3.isConfirmed) { irreparableFn(); }

                            });

                        }

                    });

                }

            });

        },

    },

});
