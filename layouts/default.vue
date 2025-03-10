<script setup lang="ts">
  const router = useRouter()
  const route = useRoute()
  const productStore = useProductStore()
  const fromPartsOfRoute = usePartsOfRoute()

  const drawer = ref(false)

  const isCurrentCategory = (category: string) => {
    return toSnake(fromPartsOfRoute.category.value) === toSnake(category)
  }

  useHead({
    title: fromPartsOfRoute.title,
  })
</script>

<template>
  <v-app>
    <v-app-bar app class="position-fixed">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="flex-1-0"> T-Market </v-toolbar-title>
      <div class="w-100 h-100 d-flex justify-center align-center">
        <h1 class="text-h6">{{ fromPartsOfRoute.title }}</h1>
      </div>
      <div class="d-flex ga-4 align-center mr-5">
        <toCartButton @goCart="router.push('/cart')" />
      </div>
    </v-app-bar>

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
            'text-primary font-weight-bold': isCurrentCategory(category),
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
