export function createElement<K extends keyof HTMLElementTagNameMap>(
  name: K,
  classes?: (string | null)[],
  style?: Partial<CSSStyleDeclaration>,
  attributes?: { [name: string]: string }
) {
  const element = document.createElement(name)

  if (classes != null) {
    classes.forEach(className => {
      if (className != null) {
        element.classList.add(className)
      }
    })
  }

  if (style != null) {
    Object.keys(style).forEach((property: any) => element.style[property] = style[property] as any)
  }

  if (attributes != null) {
    Object.keys(attributes).forEach((property: any) => element.setAttribute(property, attributes[property]))
  }

  return element
}
