export function contains<ItemType>(array: ReadonlyArray<ItemType>, item: ItemType) {
  return array.indexOf(item) !== -1
}

export function remove<ItemType>(array: ItemType[], item: ItemType) {
  const location = array.indexOf(item)

  if (location === -1) {
    throw new Error('Item was not found in an array')
  } else {
    array.splice(location, 1)
    return array
  }
}

export function fromRange<ItemType>(from: number, to: number, creator: (index: number) => ItemType) {
  const increment = from < to ? 1 : -1
  const array = [] as ItemType[]
  let index = from

  array.push(creator(index))

  while (index !== to) {
    index += increment
    array.push(creator(index))
  }

  return array
}

export function find<ItemType>(items: ItemType[], functor: (item: ItemType, index: number, array: ReadonlyArray<ItemType>) => boolean) {
  return items.filter(functor)[0]
}

export function strictIndexOf<ItemType>(items: ReadonlyArray<ItemType>, item: ItemType, errorConstructor: () => Error = () => new Error('Item not found in the array')) {
  const index = items.indexOf(item)
  if (index === -1) {
    throw errorConstructor()
  } else {
    return index
  }
}

export function join<ItemType>(arrays: ItemType[][]) {
  return arrays.reduce((result, array) => result.concat(array), [] as ItemType[])
}

export function removeDuplicates<ItemType>(array: ItemType[]) {
  return array.filter((item, index) => array.indexOf(item) === index)
}