<script lang="ts" setup>
  const emit = defineEmits(['goCart'])

  const props = defineProps<{
    disabled?: boolean
    count?: number
  }>()

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
      :content="count"
      inline
      class="position-absolute top-0 right-0"
      :class="{ 'opacity-0': !count }"
    >
    </v-badge>
  </v-btn>
</template>
