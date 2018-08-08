export function shuffle<ItemType>(numbers: ItemType[]) {
  return numbers.sort(() => {
    const random = Math.random()
    if (random > 0.5) {
      return 1
    } else if (random < 0.5) {
      return -1
    } else {
      return 0
    }
  })
}
