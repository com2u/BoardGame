export function getStrict<KeyType, ValueType>(
  map: { has(key: KeyType): boolean, get(ket: KeyType): ValueType | undefined },
  key: KeyType,
  errorConstructor: () => Error = () => new Error('Item not present in the map')
) {
  if (!map.has(key)) {
    throw errorConstructor()
  } else {
    return map.get(key) as ValueType
  }
}
