export const useFetchWith500 = async (url: string) => {
  const { data, error } = await useFetch(url)

  if (error.value) {
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
    })
  }

  return data.value
}
