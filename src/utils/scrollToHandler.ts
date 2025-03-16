export const scrollToHandler = (e: React.MouseEvent | null) => {
  e?.preventDefault()
  window.scrollTo(0, 0)
}
