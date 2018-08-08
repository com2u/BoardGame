import { remove, strictIndexOf } from '../utils/array-utils'
import { Destroyable } from '../utils/type-utils'
import { Emitter, ExposedSource } from './emitter'
import { Consumer } from './consumer'
import { Readable, Variable } from './observable-variable'
import { Observer } from './observer'
import { createFilter } from './array-filter'
import { createArrayMapper, Mapper, MapperConfig } from './array-mapper'

export type ObservablesExtractor<Container, WatchedParameters> = (item: Container) => {
  [key in keyof WatchedParameters]: Readable<WatchedParameters[key]>
}

export interface ArrayMutationDetails<ItemType> {
  item: ItemType,
  location: number
}

export interface ObservableArrayConnector<ItemType, WatchedParameters> {
  itemAdded?: (item: ArrayMutationDetails<ItemType>) => void
  itemRemoved?: (item: ArrayMutationDetails<ItemType>) => void
  itemConnector?: UpdaterConfig<ItemType, WatchedParameters>
}

export interface UpdaterConfig<SourceType, WatchedParameters> {
  extractObservables: ObservablesExtractor<SourceType, WatchedParameters>
  update: (item: SourceType, parameters: WatchedParameters) => void
}

export interface ReadonlyObservableArray<ItemType> {
  items: ReadonlyArray<ItemType>
  itemAdded: Emitter<ArrayMutationDetails<ItemType>>
  itemRemoved: Emitter<ArrayMutationDetails<ItemType>>
  connect<WatchedParameters>(connector: ObservableArrayConnector<ItemType, WatchedParameters>): Destroyable
  find<TargetType extends ItemType>(
    checker: (
      ((item: ItemType) => item is TargetType) |
      ((item: ItemType) => boolean)
    )
  ): Readable<TargetType | null>
  map<TargetType>(config: MapperConfig<ItemType, TargetType>): ReadonlyObservableArray<TargetType>
}

export class ObservableArray<ItemType> implements ReadonlyObservableArray<ItemType> {
  constructor(items: ItemType[]) {
    this._items = items.slice()
    this.items = this._items as ReadonlyArray<ItemType>
  }

  protected _items: ItemType[]

  public items: ReadonlyArray<ItemType>

  public add(...items: ItemType[]) {
    items.forEach(item => {
      this._items.push(item)
      this._itemAdded.dispatch({
        item,
        location: this._items.length - 1
      })
    })
  }

  public insert(item: ItemType, location: number) {
    this._items.splice(location, 0, item)
    this._itemAdded.dispatch({
      item,
      location
    })
  }

  public pop() {
    const item = this._items.pop()
    if (item == null) {
      return null
    }
    this._itemRemoved.dispatch({
      item,
      location: this._items.length + 1
    })
    return item
  }

  public remove(item: ItemType) {
    const location = strictIndexOf(this._items, item)

    this._items.splice(location, 1)

    this._itemRemoved.dispatch({
      item,
      location
    })
  }

  public replace(item: ItemType, newItem: ItemType) {
    const location = strictIndexOf(this._items, item)

    this._items.splice(location, 1, newItem)

    this._itemRemoved.dispatch({
      item,
      location
    })
    this._itemAdded.dispatch({
      item: newItem,
      location
    })
  }

  public removeByIndex(index: number) {
    if (index < 0 || index >= this._items.length) {
      throw new Error('Index is out of bounds')
    } else {
      const item = this._items[index]
      this.remove(item)
    }
  }

  public find<TargetType extends ItemType>(checker: (item: ItemType) => item is TargetType): Readable<TargetType | null> {
    const result = new Variable<TargetType | null>(null)
    const filter = createFilter(this, checker)

    const updateResult = () => {
      const oldResult = result.get()
      const newResult = filter.result.items[0]

      if (oldResult !== newResult) {
        result.set(newResult)
      }
    }

    filter.result.connect({
      itemAdded: updateResult,
      itemRemoved: updateResult
    })

    return result
  }

  public map<TargetType>(config: MapperConfig<ItemType, TargetType>): ReadonlyObservableArray<TargetType> {
    return new (createArrayMapper(config))(this).result
  }

  public filter<TargetType extends ItemType>(filter: (item: ItemType) => item is TargetType) {
    return createFilter(this, filter).result
  }

  public connect<WatchedParameters>(connector: ObservableArrayConnector<ItemType, WatchedParameters>): Destroyable {
    const { itemAdded, itemRemoved, itemConnector } = connector
    if (itemAdded != null) {
      this._itemAdded.subscribe(itemAdded)
      this._items.forEach((item, location) => {
        itemAdded({
          item,
          location
        })
      })
    }

    if (itemRemoved != null) {
      this._itemRemoved.subscribe(itemRemoved)
    }

    if (itemConnector != null) {
      const itemObserversMap = new Map<
        ItemType,
        {
          observable: Readable<any>,
          observer: Observer<any>
        }[]
      >()

      this.itemAdded.subscribe(details => {
        const { update, extractObservables } = itemConnector
        const parameters = {} as any
        const observables = extractObservables(details.item)

        Object
          .keys(observables)
          .map(name => {
            const observable = (observables as any)[name] as Readable<any>
            const observer = (value: any) => {
              parameters[name] = value
              update(details.item, parameters)
            }

            parameters[name] = observable.get()
            observable.subscribe(observer)

            return {
              observable,
              observer
            }
          })
      })

      this.itemRemoved.subscribe(details => {
        const subscriptions = itemObserversMap.get(details.item)
        if (subscriptions != null) {
          subscriptions.forEach(subscription => {
            subscription.observable.unsubscribe(subscription.observer)
          })
        }
        itemObserversMap.delete(details.item)
      })
    }

    return {
      destroy: () => {
        if (itemAdded) {
          this._itemAdded.unsubscribe(itemAdded)
        }
        if (itemRemoved != null) {
          this._itemRemoved.unsubscribe(itemRemoved)
        }
      }
    }
  }

  protected _itemRemoved = new ExposedSource<ArrayMutationDetails<ItemType>>()
  public readonly itemRemoved = this._itemRemoved as Emitter<ArrayMutationDetails<ItemType>>

  protected _itemAdded = new ExposedSource<ArrayMutationDetails<ItemType>>()
  public readonly itemAdded = this._itemAdded as Emitter<ArrayMutationDetails<ItemType>>
}
