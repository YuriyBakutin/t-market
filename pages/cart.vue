<script lang="ts" setup>
  const router = useRouter()
  const cartStore = useCartStore()

  // Переход на страницу каталога
  const goBack = () => {
    router.push('/catalog/all')
  }

  const openDeleteConfirmModal = ref(false)
  const deletedCartItemId = ref(0)

  const deletionRequest = (cartItemId: number) => {
    deletedCartItemId.value = cartItemId
    openDeleteConfirmModal.value = true
  }

  const deleteItem = () => {
    openDeleteConfirmModal.value = false
    cartStore.removeItem(deletedCartItemId.value)
  }

  const cancelDeleteItem = () => {
    openDeleteConfirmModal.value = false
    deletedCartItemId.value = 0
  }

  const openBuySuccessModal = ref(false)

  const toSetupBuy = () => {
    openBuySuccessModal.value = true
  }

  const cartInit = () => {
    cartStore.clearCart()
    router.push('/catalog/all')
  }
</script>
<template>
  <v-container>
    <v-card-title>
      <span class="headline">Cart</span>
    </v-card-title>
    <div v-if="cartStore.items.length" class="d-flex flex-column ga-6 mb-6">
      <CartItem
        v-for="item in cartStore.items"
        :key="item.id"
        :cartItem="item"
        @delete="deletionRequest(item.id)"
      />
    </div>
    <v-alert v-else color="blue-grey-darken-4" icon="mdi-cart-outline"
      >There's nothing here yet</v-alert
    >
    <v-card-actions class="d-flex justify-space-between align-center">
      <v-btn @click="goBack">To Catalog</v-btn>
      <div class="d-flex ga-4 align-center">
        <v-card-title
          v-if="cartStore.items.length"
          class="text-blue-darken-3 text-body-1"
        >
          {{ getPrice(cartStore.cartTotal) }}
        </v-card-title>
        <v-btn
          v-if="cartStore.items.length"
          prepend-icon="mdi-wallet-outline"
          color="orange-darken-1"
          @click="toSetupBuy"
          >Set up the buy</v-btn
        >
      </div>
    </v-card-actions>
  </v-container>
  <v-dialog v-model="openDeleteConfirmModal" max-width="450" persistent>
    <v-card
      prepend-icon="mdi-delete-outline"
      title="Ready to delete? Just confirm, please!"
    >
      <template v-slot:actions>
        <v-btn @click="cancelDeleteItem"> Cancel </v-btn>
        <v-btn @click="deleteItem"> Delete </v-btn>
      </template>
    </v-card>
  </v-dialog>
  <v-dialog v-model="openBuySuccessModal" max-width="450" persistent>
    <v-card
      prepend-icon="mdi-gift-outline"
      title="The purchase was successful!"
      text="Thank you and we look forward to seeing you again."
    >
      <template v-slot:actions>
        <v-btn @click="cartInit"> OK </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
