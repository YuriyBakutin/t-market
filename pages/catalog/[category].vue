<script setup lang="ts">
  const route = useRoute()
  const productStore = useProductStore()
  const fromPartsOfRoute = usePartsOfRoute()

  productStore.fetchProducts()

  const breadcrumbs = computed(() => {
    const selectedCategorySnake = toSnake(fromPartsOfRoute.category.value)

    const breadcrumbs: IBreadcrumbsItem[] = [
      {
        title: 'Catalog',
        disabled: fromPartsOfRoute.category.value === 'all categories',
        href: '/catalog/all',
      },
    ]

    if (fromPartsOfRoute.category.value !== 'all categories')
      breadcrumbs.push({
        title: capitalizeFirstLetter(fromPartsOfRoute.category.value),
        href: '/catalog/' + selectedCategorySnake,
        disabled: !fromPartsOfRoute.product.value,
      })

    if (fromPartsOfRoute.product.value) {
      breadcrumbs.push({
        title: fromPartsOfRoute.title.value,
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
      <v-breadcrumbs :items="breadcrumbs" class="pa-0">
        <template v-slot:item="{ item }">
          <NuxtLink
            :to="item.href"
            :disabled="item.disabled"
            class="v-breadcrumbs-item--link text-decoration-none"
            :class="
              item.disabled ? 'v-breadcrumbs-item--disabled' : 'cursor-pointer'
            "
          >
            {{ item.title }}
          </NuxtLink>
        </template>
      </v-breadcrumbs>
    </v-app-bar>
    <v-container v-if="fromPartsOfRoute.product.value">
      <Product :product="fromPartsOfRoute.product.value" />
    </v-container>
    <v-container v-else>
      <v-card class="pa-5 mb-6">
        <h1 class="text-h4 font-weight-bold">
          {{ capitalizeFirstLetter(fromPartsOfRoute.category.value) }}
        </h1>
        <v-row class="ga-6 w-100 px-5 mt-6 pb-6">
          <ProductCard
            v-for="product in productStore.productsByCategory(
              fromPartsOfRoute.category.value,
            )"
            :key="product.id"
            :product="product"
          />
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</template>
