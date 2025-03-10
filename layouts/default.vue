<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()
  const productStore = useProductStore()

  const drawer = ref(false)

  const pageTitle = ref('')

  const setPageTitle = () => {
    const productIdFromRoute = route.hash?.substring(1)
    console.log('route.fullPath: ', route.fullPath)

    if (route.path.includes('/cart')) {
      pageTitle.value = 'Cart'
      productStore.clearSelectedCategory()

      return
    }

    if (productIdFromRoute) {
      const product = productStore.products.find(
        (p) => p.id === +productIdFromRoute,
      )

      console.log('product: ', product)

      if (!product) {
        router.push('/404')

        return
      }

      pageTitle.value = product.title

      return
    }

    if (route.params.category === 'all') {
      pageTitle.value = 'All Categories'

      return
    }

    const categoryFromStore = productStore.categories.find(
      (category) => route.params.category === toSnake(category),
    )

    console.log('categoryFromStore: ', categoryFromStore)

    if (!categoryFromStore) {
      pageTitle.value = 'All Categories'
    }

    pageTitle.value = capitalizeFirstLetter(categoryFromStore ?? '')
  }

  setPageTitle()

  watch(
    () => route.fullPath,
    () => {
      setPageTitle()

      console.log('pageTitle.value: ', pageTitle.value)
    },
  )

  watch(
    () => productStore.categories,
    () => {
      setPageTitle()

      console.log('pageTitle.value: ', pageTitle.value)
    },
  )

  useHead({
    title: pageTitle,
  })
</script>

<template>
  <v-app>
    <!-- Шапка -->
    <v-app-bar app class="position-fixed">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="flex-1-0"> T-Market </v-toolbar-title>
      <div class="w-100 h-100 d-flex justify-center align-center">
        <h1 class="text-h6">{{ pageTitle }}</h1>
      </div>
      <div class="d-flex ga-4 align-center mr-5">
        <toCartButton @goCart="router.push('/cart')" />
      </div>
    </v-app-bar>

    <!-- Боковая панель -->
    <v-navigation-drawer v-model="drawer" app class="position-fixed">
      <v-list>
        <v-list-item
          class="text-h6"
          :class="{
            'text-primary font-weight-bold': route.params.category === 'all',
          }"
          @click="router.push(`/catalog/all`)"
        >
          All categories
        </v-list-item>
        <v-list-item
          v-for="category in productStore.categories"
          :key="'nav' + category"
          class="text-h6"
          :class="{
            'text-primary font-weight-bold':
              (route.params.category as string)?.toLowerCase() ===
              toSnake(category).toLowerCase(),
          }"
          @click="router.push(`/catalog/${toSnake(category)}`)"
        >
          {{ capitalizeFirstLetter(category) }}
        </v-list-item>
        <v-divider />
        <v-list-item
          class="text-h6"
          :class="{
            'text-primary font-weight-bold': route.path.includes('/cart'),
          }"
          @click="router.push(`/cart`)"
        >
          Cart
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <slot />
  </v-app>
</template>
