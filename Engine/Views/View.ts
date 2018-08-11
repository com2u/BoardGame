export interface View {
  destroy(): void
  element: HTMLElement
  mounted?(): void
}
