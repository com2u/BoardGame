import { ObservableArray, ReadonlyObservableArray } from './observable-array'
import { Destroyable } from '../utils/type-utils'

export class ArrayJoiner<ItemType> {
  constructor(
    private arrays: ReadonlyObservableArray<ObservableArray<ItemType>>
  ) {
    this.subscription = arrays.connect({
      itemAdded: details => {
        const array = details.item
        const index = details.location
        const previousArray = this.arrayDetails[index - 1]
        let startIndex = 0

        if (previousArray != null) {
          startIndex = previousArray.endIndex
        }

        this.arrayDetails.splice(index, 0, {
          startIndex,
          endIndex: startIndex
        })

        const subscription = array.connect({
          // tslint:disable-next-line:no-shadowed-variable
          itemAdded: details => {
            const indexInResultArray = this.arrayDetails[index].startIndex + details.location
            this.arrayDetails[index].endIndex += 1
            this.arrayDetails.slice(index + 1).forEach(arrayDetails => {
              arrayDetails.startIndex += 1
              arrayDetails.endIndex += 1
            })

            this._result.insert(details.item, indexInResultArray)
          },
          // tslint:disable-next-line:no-shadowed-variable
          itemRemoved: details => {
            const indexInResultArray = this.arrayDetails[index].startIndex + details.location
            this.arrayDetails[index].endIndex -= 1
            this.arrayDetails.slice(index + 1).forEach(arrayDetails => {
              arrayDetails.startIndex -= 1
              arrayDetails.endIndex -= 1
            })

            this._result.removeByIndex(indexInResultArray)
          }
        })
      },
      itemRemoved: details => {
        const itemsToRemove = details.item.items.length
        const itemsToRemoveStartIndex = this.arrayDetails[details.location].startIndex

        this.arrayDetails.slice(details.location).forEach(arrayDetails => {
          arrayDetails.startIndex -= details.item.items.length
          arrayDetails.endIndex -= details.item.items.length
        })

        for (let i = itemsToRemoveStartIndex; i < itemsToRemoveStartIndex + itemsToRemove; i++) {
          this._result.removeByIndex(itemsToRemoveStartIndex)
        }
      }
    })
  }

  private arrayDetails = [] as { startIndex: number, endIndex: number }[]

  private subscription: Destroyable

  private _result = new ObservableArray<ItemType>([])

  public result = this._result as ReadonlyObservableArray<ItemType>
}
