export const isOverflowing = (el: HTMLElement | null) => {
  if (!el) {
    return false
  }

  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
}
