**vue version: @3.4.19**

---

**路由設定檔案：**[router / index.js](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/router/index.js)

---

**後台視圖元件**

[views / AdminView.vue](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/views/AdminView.vue)

[views / admin / AdminDashboardView.vue](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/views/admin/AdminDashboardView.vue)

[views / admin / AdminProductView.vue](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/views/admin/AdminProductView.vue)

[views / admin / AdminOrderView.vue](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/views/admin/AdminOrderView.vue)

---

**有在 `/admin/order` 用上的元件**

左側導覽列：[components / AdminSidebar.vue](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/components/AdminSidebar.vue)

載入動畫：[components / LoadingOverlay.vue](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/components/LoadingOverlay.vue)


查看訂單詳細的彈出視窗：[components / modal / AdminOrderModal.vue ](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/components/modal/AdminOrderModal.vue)



刪除訂單的彈出視窗 ( 和刪除商品共用 )：[components / modal / DeleteModal.vue](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/components/modal/DeleteModal.vue)

---

**🍍**

後台驗證相關：[stores / adminAuth.js](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/stores/adminAuth.js)

後台商品相關：[stores / adminProduct.js](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/stores/adminProduct.js)

後台訂單相關：[stores / adminOrder.js](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/stores/adminOrder.js)

載入動畫相關：[stores / loader.js](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/stores/loader.js)

提示訊息相關：[stores / alert.js](https://github.com/QuantumParrot/q-vue-warn-side-effect/blob/main/src/stores/alert.js)

---

**相關討論**

[vuejs / core - issues #10341](https://github.com/vuejs/core/issues/10341) **｜** [vuejs / pinia - issues #2585](https://github.com/vuejs/pinia/discussions/2585)

