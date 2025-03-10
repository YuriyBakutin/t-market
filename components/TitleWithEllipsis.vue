<script setup lang="ts">
  const emit = defineEmits(['click'])

  defineProps<{
    title: string
  }>()

  const titleElem = ref<HTMLElement | null>(null)
  const isTitleOverflowing = ref(false)

  onMounted(() => {
    isTitleOverflowing.value = isOverflowing(titleElem.value)
  })
</script>

<template>
  <div
    ref="titleElem"
    class="card-title few-lines two-title-lines cursor-pointer"
    @click="$emit('click')"
  >
    {{ title }}
    <v-tooltip v-if="isTitleOverflowing" activator="parent" location="bottom">
      <div :style="{ width: '250px' }">
        {{ title }}
      </div>
    </v-tooltip>
  </div>
</template>

<style scoped>
  .few-lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
  .two-title-lines {
    height: 4rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .card-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: 0.0125em;
    min-width: 0;
    margin: 0.5rem 0;
    padding: 0 1rem;
    text-transform: none;
  }
</style>
