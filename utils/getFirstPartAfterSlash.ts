export const getFirstPartAfterSlash = (url: string) => {
  const match = url.match(/^\/([^/]+)/)
  return match ? match[1] : null
}
