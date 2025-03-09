<script setup lang="ts">
  defineProps<{
    product: IProduct
  }>()

  const getPrice = (price: number) => {
    return `$ ${price.toFixed(2)}`
  }

  const goToProduct = () => {
    console.log('—> goToProduct()')
  }

  const addToCart = () => {
    console.log('—> addToCart()')
  }

  const titleElem = ref<HTMLElement | null>(null)
  const isTitleOverflowing = ref(false)

  onMounted(() => {
    isTitleOverflowing.value = isOverflowing(titleElem.value)
  })
</script>

<template>
  <v-card class="mx-auto rounded-lg" width="300">
    <v-img
      height="300px"
      :src="product.image"
      cover
      class="cursor-pointer"
      @click="goToProduct"
    />
    <div
      ref="titleElem"
      class="card-title few-lines two-title-lines cursor-pointer"
      @click="goToProduct"
    >
      {{ product.title }}
      <v-tooltip v-if="isTitleOverflowing" activator="parent" location="bottom">
        <div :style="{ width: '250px' }">
          {{ product.title }}
        </div>
      </v-tooltip>
    </div>

    <v-card-actions>
      <v-row class="w-100 justify-space-between align-center px-3">
        <v-card-title class="text-blue-darken-3">
          {{ getPrice(product.price) }}
        </v-card-title>
        <v-btn
          text="To cart"
          append-icon="mdi-cart-outline"
          color="orange-darken-1"
          size="x-large"
          @click="addToCart"
        />
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
  .few-lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
  .two-title-lines {
    height: 4rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .card-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.0125em;
    min-width: 0;
    margin: 0.5rem 0;
    padding: 0 1rem;
    text-transform: none;
  }
</style>
