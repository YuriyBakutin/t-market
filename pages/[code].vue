<script setup lang="ts">
  const route = useRoute()
  const errorCode = route.params.code
  const errorMessage = ref('')

  if (errorCode === '404') {
    errorMessage.value = 'The requested page does not exist.'
  } else if (errorCode === '500') {
    errorMessage.value = 'An internal server error occurred.'
  } else {
    errorMessage.value = 'An unknown error occurred.'
  }

  const handleError = () => {
    navigateTo('/')
  }
</script>
<template>
  <div class="h-screen w-100 d-flex justify-center align-center">
    <div>
      <h1 v-if="errorCode === '404'">Page Not Found (404)</h1>
      <h1 v-else-if="errorCode === '500'">Server error (500)</h1>
      <h1 v-else>An error occurred</h1>
      <p>{{ errorMessage }}</p>
      <v-btn class="mt-4" @click="handleError">Go to Home</v-btn>
    </div>
  </div>
</template>
