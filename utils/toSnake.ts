export const toSnake = (str: string) =>
  str
    .replace(/[^A-Za-z\s]+/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[A-Z]/g, (match) => '_' + match)
    .toLowerCase()
