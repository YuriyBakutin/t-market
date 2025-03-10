<script setup lang="ts">
  defineProps<{ product: IProduct }>()
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
    <ProductBottomBlock :product="product" />
  </v-card>
</template>
