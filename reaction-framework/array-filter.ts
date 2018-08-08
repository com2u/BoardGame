import { ObservableArray, ReadonlyObservableArray } from './observable-array'
import { contains } from '../utils/array-utils'

export abstract class ArrayFilter<ItemType, FilteredItem extends ItemType> {
  constructor(
    private array: ReadonlyObservableArray<ItemType>
  ) {
    array.connect({
      itemAdded: ({item}) => {
        if (this.filter(item)) {
          this._result.add(item)
        }
      },
      itemRemoved: ({item}) => {
        if (contains(this.result.items, item)) {
          this._result.remove(item as any)
        }
      }
    })
  }

  protected abstract filter(item: ItemType): item is FilteredItem

  private _result = new ObservableArray<FilteredItem>([])

  public readonly result: ReadonlyObservableArray<FilteredItem> = this._result
}

export function createFilter<ItemType, FilteredItem extends ItemType>(
  array: ReadonlyObservableArray<ItemType>,
  filter: (item: ItemType) => item is FilteredItem
) {
  const Filter = class ConfiguredFilter extends ArrayFilter<ItemType, FilteredItem> {
    public filter(item: ItemType): item is FilteredItem {
      return filter(item)
    }
  }
  return new Filter(array)
}

export function createNotNullFilter<ItemType>(array: ReadonlyObservableArray<ItemType | null | undefined>) {
  // tslint:disable-next-line:only-arrow-functions
  const filterCallback = function(item: ItemType | null | undefined): item is ItemType {
    return item != null
  }

  return createFilter(array, filterCallback)
}
