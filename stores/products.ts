import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as IProduct[],
    categories: [] as string[],
  }),
  actions: {
    async fetchProducts() {
      if (this.products.length) return

      const data = await useFetchWith500('https://fakestoreapi.com/products')
      this.products = data as IProduct[]

      this.categories = [
        ...new Set(this.products.map((product) => product.category) ?? []),
      ]
    },
  },
  getters: {
    productsByCategory: (state) => (category: string) =>
      state.products?.filter(
        (product) =>
          category === 'all categories' || product.category === category,
      ) ?? [],
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  }, // Saving to sessionStorage
})
