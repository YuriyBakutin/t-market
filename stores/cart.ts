import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as ICartItem[],
  }),
  actions: {
    addItem(item: ICartItem) {
      const existingItem = this.items.find((i) => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    updateItemQuantity(id: number, quantity: number) {
      const item = this.items.find((item) => item.id === id)
      if (!item) return
      item.quantity = quantity
    },
    removeItem(itemId: number) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },
    clearCart() {
      this.items = []
    },
  },
  getters: {
    cartTotal: (state) => {
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
    },
    cartItemById: (state) => (id: number) => {
      return state.items.find((item) => item.id === id)
    },
    cartCount: (state) => {
      return state.items.length
    },
  },
  persist: true, // Saving to localStorage
})
