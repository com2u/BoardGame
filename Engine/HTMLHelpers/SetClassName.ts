export function setClassName(element: HTMLElement, className: string, addRemoveSwitch: boolean) {
  if (addRemoveSwitch) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}
