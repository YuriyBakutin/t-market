export const usePartsOfRoute = () => {
  const router = useRouter()
  const route = useRoute()
  const productStore = useProductStore()

  const section = ref(null as string | null)
  const title = ref('')
  const category = ref('')
  const product: Ref<IProduct | null> = ref(null)

  watchEffect(() => {
    section.value = getFirstPartAfterSlash(route.path)

    if (section.value === 'cart') {
      title.value = 'Cart'
      category.value = ''
      product.value = null

      return
    }

    if (section.value === 'catalog') {
      const productIdFromRoute = route.hash?.substring(1)

      if (productIdFromRoute) {
        const productFromStore = productStore.products.find(
          (p) => p.id === +productIdFromRoute,
        )

        if (!productFromStore) {
          router.push('/404')

          return
        }

        title.value = productFromStore.title
        category.value = productFromStore.category
        product.value = productFromStore

        return
      }

      if (route.params.category === 'all') {
        title.value = 'All categories'
        category.value = 'all categories'
        product.value = null

        return
      }

      category.value = (
        productStore.categories.find(
          (category) => toSnake(category) === route.params.category,
        ) ?? ''
      ).toLowerCase()

      if (category.value !== null) {
        title.value = capitalizeFirstLetter(category.value)
      } else {
        title.value = ''
      }

      product.value = null
    }
  })

  return { title, category, product }
}
