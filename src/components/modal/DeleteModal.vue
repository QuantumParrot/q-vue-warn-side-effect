<template>

<div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
            <div class="modal-body p-4">
                <template v-if="targetGenre === 'product'">
                    <h4 class="mb-4">確定刪除【{{ target.title }}】？</h4>
                    <p>此操作無法復原，你要確定欸！(ﾟдﾟ≡ﾟдﾟ)</p>
                    <img class="img-zoom-out mb-4"
                        :src="target.imageUrl" :alt="target.title">
                </template>
                <template v-else>
                    <h4 class="mb-4">確定刪除訂單！？</h4>
                    <p class="mb-4">這是客人的訂單欸！你要確定欸！(ﾟдﾟ≡ﾟдﾟ)</p>
                </template>
                <div>
                    <button type="button" class="btn btn-danger me-2"
                            @click="$emit('delete-target')">對啦對啦</button>
                    <button type="button" class="btn btn-outline-primary"
                            @click="hideModal">考慮一下</button>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style>

.img-zoom-out {

  object-fit: cover;
  height: 300px;

}

</style>

<script>

import modalMixins from '@/mixins/modal';

//

export default {

    mixins: [modalMixins],

    data() { return { modal: '' }; },

    props: {

        target: { required: true },
        targetGenre: { required: true },

    },

    emits: ['delete-target'],

};

</script>
