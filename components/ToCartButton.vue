<script lang="ts" setup>
  const emit = defineEmits(['goCart'])

  const props = withDefaults(
    defineProps<{
      disabled?: boolean
    }>(),
    {
      disabled: false,
    },
  )

  const cartStore = useCartStore()

  const goCart = () => {
    if (props.disabled) {
      return
    }

    emit('goCart')
  }
</script>

<template>
  <v-btn
    @click="goCart"
    icon="mdi-cart-outline"
    class="text-none position-relative"
    :class="{ 'opacity-50 cursor-default': disabled }"
  >
    <v-icon>mdi-cart-outline</v-icon>
    <v-badge
      color="error"
      :content="cartStore.cartCount"
      inline
      class="position-absolute top-0 right-0"
      :class="{ 'opacity-0': !cartStore.cartCount }"
    >
    </v-badge>
  </v-btn>
</template>
