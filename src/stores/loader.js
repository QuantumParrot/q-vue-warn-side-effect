import { defineStore } from 'pinia';

//

export default defineStore('loader', {

    state: () => ({ loaderQueue: [], loadingItem: '' }),

    getters: { isLoading: ({ loaderQueue }) => !!loaderQueue.length },

    actions: {

        createLoader(task) { this.loaderQueue.push(task); },

        removeLoader(task) { this.loaderQueue.splice(this.loaderQueue.indexOf(task), 1); },

        handleSingleLoader(id) { this.loadingItem = id; },

    },

});
