<script setup lang="ts">
  const props = defineProps<{
    product: IProduct
  }>()

  const cartStore = useCartStore()

  const addToCart = () => {
    const existingItem = cartStore.cartItemById(props.product.id)

    if (existingItem) {
      cartStore.updateItemQuantity(existingItem.id, existingItem.quantity + 1)
    } else {
      cartStore.addItem({
        ...props.product,
        quantity: 1,
      })
    }
  }

  const cartButtonText = ref('To cart')
  const cartButtonColor = ref('orange-darken-2')
  const cartButtonIcon = ref('mdi-cart-outline')

  watchEffect(() => {
    const existingItem = cartStore.cartItemById(props.product.id)
    const quantity = existingItem?.quantity || 0

    cartButtonText.value = existingItem ? `In cart (${quantity})` : 'To cart'
    cartButtonColor.value = existingItem ? 'teal-darken-2' : 'orange-darken-2'
    cartButtonIcon.value = existingItem ? '' : 'mdi-cart-outline'
  })
</script>

<template>
  <v-card-actions>
    <v-row class="w-100 justify-space-between align-center px-3">
      <v-card-title class="text-blue-darken-3">
        {{ getPrice(product.price) }}
      </v-card-title>
      <v-btn
        :text="cartButtonText"
        :append-icon="cartButtonIcon"
        :color="cartButtonColor"
        size="x-large"
        @click="addToCart"
      />
    </v-row>
  </v-card-actions>
</template>
