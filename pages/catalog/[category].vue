<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()

  const data = await useFetchWith500('https://fakestoreapi.com/products')
  const products = ref(data as IProduct[])
  const drawer = ref(true)

  const categories = computed(() => {
    return [
      ...new Set(products.value?.map((product) => product.category) ?? []),
    ]
  })

  const getProductsByCategory = (category: string) =>
    products.value?.filter((product) =>
      category === '' ? true : product.category === category,
    ) ?? []

  const selectedCategory = ref('')
  const productId = ref(route.hash?.substring(1))
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

    selectedProduct.value = products.value?.find(
      (product) => product.id === +productId.value,
    )

    selectedCategory.value =
      categoryFromRoute === 'all' ? '' : (
        (categories.value.find(
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
  <v-app>
    <v-app-bar app class="position-fixed">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="flex-1-0"> T-Market </v-toolbar-title>
      <div class="w-100 h-100 d-flex justify-center align-center">
        <h1 class="text-h6">{{ selectedCategoryTitle }}</h1>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="position-fixed">
      <v-list>
        <v-list-item
          class="text-h6"
          :class="{
            'text-primary font-weight-bold': selectedCategory === '',
          }"
          @click="selectCategory('')"
        >
          All categories
        </v-list-item>
        <v-list-item
          v-for="category in categories"
          :key="'nav' + category"
          class="text-h6"
          :class="{
            'text-primary font-weight-bold': selectedCategory === category,
          }"
          @click="selectCategory(category)"
        >
          {{ capitalizeFirstLetter(category) }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
  </v-app>
</template>
