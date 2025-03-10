<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()
  const productStore = useProductStore()

  productStore.fetchProducts()

  const getProductsByCategory = (category: string) =>
    productStore.products?.filter((product) =>
      category === '' ? true : product.category === category,
    ) ?? []

  const selectedCategory = ref('')
  const selectedProduct: Ref<IProduct | null | undefined> = ref(null)

  const selectCategory = (category: string) => {
    if (category === '') {
      router.push('/catalog/all')
    } else {
      router.push(`/catalog/${toSnake(category)}`)
    }
  }

  const selectedCategoryTitle = computed(() => {
    if (selectedCategory.value === '') {
      return 'All categories'
    }
    return capitalizeFirstLetter(selectedCategory.value)
  })

  watchEffect(async () => {
    const categoryFromRoute = route.params.category as string
    const productIdFromRoute = route.hash?.substring(1)

    selectedProduct.value = productStore.products?.find(
      (product) => product.id === +productIdFromRoute,
    )

    selectedCategory.value =
      categoryFromRoute === 'all' ? '' : (
        (productStore.categories?.find(
          (category) => toSnake(category) === categoryFromRoute,
        ) ?? '')
      )
  })

  const breadcrumbs = computed(() => {
    const selectedCategorySnake = toSnake(selectedCategory.value)

    const breadcrumbs: IBreadcrumbsItem[] = [
      {
        title: 'Catalog',
        disabled: !selectedCategorySnake,
        href: '/catalog/all',
      },
    ]

    breadcrumbs.push({
      title: capitalizeFirstLetter(selectedCategory.value) || 'All categories',
      href: '/catalog/' + (selectedCategorySnake || 'all'),
    })

    if (selectedProduct.value) {
      breadcrumbs.push({
        title: selectedProduct.value.title,
        disabled: true,
        href: route.fullPath,
      })
    }

    return breadcrumbs
  })
</script>

<template>
  <v-main>
    <v-app-bar app class="position-fixed pl-6 pr-6">
      <v-breadcrumbs :items="breadcrumbs" class="pa-0" />
    </v-app-bar>
    <v-container v-if="selectedProduct">
      <Product :product="selectedProduct" />
    </v-container>
    <v-container v-else>
      <v-card class="pa-5 mb-6">
        <h1 class="text-h4 font-weight-bold">
          {{ selectedCategoryTitle }}
        </h1>
        <v-row class="ga-6 w-100 px-5 mt-6 pb-6">
          <ProductCard
            v-for="product in getProductsByCategory(selectedCategory)"
            :key="product.id"
            :product="product"
          />
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>
