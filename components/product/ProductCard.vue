<script setup lang="ts">
  const props = defineProps<{
    product: IProduct
  }>()

  const router = useRouter()

  const goToProduct = () => {
    router.push(
      `/catalog/${toSnake(props.product.category)}#${props.product.id}`,
    )
  }

  const titleElem = ref<HTMLElement | null>(null)
  const isTitleOverflowing = ref(false)

  onMounted(() => {
    isTitleOverflowing.value = isOverflowing(titleElem.value)
  })
</script>

<template>
  <v-card :id="product.id" class="mx-auto rounded-lg" width="300">
    <v-img
      height="300px"
      :src="product.image"
      cover
      class="cursor-pointer"
      @click="goToProduct"
    />
    <TitleWithEllipsis :title="product.title" @click="goToProduct" />
    <ProductBottomBlock :product="product" />
  </v-card>
</template>
