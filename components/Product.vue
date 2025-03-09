<script setup lang="ts">
  defineProps<{ product: IProduct }>()

  const getPrice = (price: number) => {
    return `$ ${price.toFixed(2)}`
  }

  const addToCart = () => {
    console.log('—> addToCart()')
  }
</script>

<template>
  <v-card :id="product.id + ''" class="rounded-lg">
    <v-img height="600px" :src="product.image"></v-img>
    <div class="text-h5 pl-6 pr-4 mt-6 mb-4">
      {{ product.title }}
    </div>
    <div class="text-subtitle-1 pl-6 pr-4">
      {{ product.description }}
    </div>

    <v-card-actions class="pl-6 pr-6 pt-6 pb-8">
      <v-row class="w-100 justify-space-between align-center px-3">
        <div class="text-blue-darken-3 text-h5">
          {{ getPrice(product.price) }}
        </div>
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
