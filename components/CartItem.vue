<script lang="ts" setup>
  import { useCartStore } from '@/stores/cart'
  const emit = defineEmits(['delete'])
  const props = defineProps<{
    cartItem: ICartItem
  }>()

  const cartStore = useCartStore()

  const quantityDecrement = () => {
    const newQuantity = props.cartItem.quantity - 1
    if (newQuantity <= 0) {
      emit('delete')

      return
    }

    cartStore.updateItemQuantity(props.cartItem.id, newQuantity)
  }

  const quantityIncrement = () => {
    cartStore.updateItemQuantity(props.cartItem.id, props.cartItem.quantity + 1)
  }

  const router = useRouter()

  const goToProduct = () => {
    router.push(
      `/catalog/${toSnake(props.cartItem.category)}#${props.cartItem.id}`,
    )
  }
</script>
<template>
  <v-card class="d-flex">
    <v-img
      width="100px"
      max-width="100px"
      height="100px"
      max-height="100px"
      aspect-ratio="1/1"
      :src="cartItem.image"
      class="ma-3 cursor-pointer"
      @click="goToProduct"
    />
    <div class="d-flex flex-column w-100 pt-2 pb-2">
      <TitleWithEllipsis :title="cartItem.title" @click="goToProduct" />
      <v-card-text class="d-flex justify-space-between w-100 pt-0 pb-4">
        <div class="d-flex ga-3 align-center">
          <span>{{ getPrice(cartItem.price) }}</span>
          <span>×</span>
          <span>{{ cartItem.quantity }}</span>
          <div class="d-flex ga-1">
            <v-card
              class="d-flex justify-center align-center"
              :style="{ width: '20px', height: '20px' }"
              @click="quantityDecrement"
              >-</v-card
            >
            <v-card
              class="d-flex justify-center align-center"
              :style="{ width: '20px', height: '20px' }"
              @click="quantityIncrement"
              >+</v-card
            >
          </div>
          <span>=</span>
          <span>{{ getPrice(cartItem.price * cartItem.quantity) }}</span>
        </div>
        <v-icon icon="mdi-delete-outline" @click="emit('delete')" />
      </v-card-text>
    </div>
  </v-card>
</template>
