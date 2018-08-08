import { ObservableArray, ReadonlyObservableArray, ObservableArrayConnector, ObservablesExtractor } from './observable-array'
import { getStrict } from '../utils/map-utils'
import { Readable } from './observable-variable'

export type Updater<ItemType, TargetType, WatchedParameters> = (item: ItemType, previouslyMapped: TargetType, parameters: WatchedParameters) => TargetType

export abstract class ArrayMapper<ItemType, TargetType, WatchedParameters> {
  constructor(
    private array: ReadonlyObservableArray<ItemType>
  ) {
    const connector: ObservableArrayConnector<ItemType, any> = {
      itemAdded: ({item}) => {
        const mapped = this.map(item)

        this.mappedItems.set(item, mapped)
        this._result.add(mapped)
      },
      itemRemoved: ({item}) => {
        const mapped = this.getMapped(item)

        this.mappedItems.delete(item)
        this._result.remove(mapped)
      }
    }

    const extractor = this.getExtractor()

    if (extractor != null) {
      connector.itemConnector = {
        extractObservables: extractor,
        update: (item, parameters) => {
          const previouslyMapped = this.getMapped(item)
          const updater = this.getUpdater()
          const mapped = updater == null
            ? this.map(item)
            : updater(item, previouslyMapped, parameters)

          if (previouslyMapped !== mapped) {
            this.mappedItems.set(item, mapped)
            this._result.replace(previouslyMapped, mapped)
          }

        }
      }
    }

    array.connect(connector)
  }

  private getMapped(item: ItemType) {
    return getStrict(
      this.mappedItems,
      item,
      () => new Error('Severe state exception: removed item was never added')
    )
  }

  private mappedItems = new Map<ItemType, TargetType>()

  protected abstract map(item: ItemType): TargetType

  protected getExtractor(): ObservablesExtractor<ItemType, any> | null {
    return null
  }

  protected getUpdater(): Updater<ItemType, TargetType, WatchedParameters> | null {
    return null
  }

  private _result = new ObservableArray<TargetType>([])

  public readonly result = this._result as ReadonlyObservableArray<TargetType>
}

export type Mapper<SourceType, TargetType> = (item: SourceType) => TargetType

export interface UpdaterConfig<SourceType, TargetType, WatchedParameters> {
  extractObservables: ObservablesExtractor<SourceType, WatchedParameters>
  update: (item: SourceType, previouslyMapped: TargetType, parameters: WatchedParameters) => TargetType
}

export interface MapperConfig<SourceType, TargetType> {
  map: Mapper<SourceType, TargetType>,
  updaterConfig?: UpdaterConfig<SourceType, TargetType, any>
}

export function createArrayMapper<SourceType, TargetType>(config: MapperConfig<SourceType, TargetType>) {
  const {
    map,
    updaterConfig
  } = config
  const extractObservables = updaterConfig
    ? updaterConfig.extractObservables
    : null
  const update = updaterConfig
    ? updaterConfig.update
    : null
  const ArrayMapperClass = class ConfigurableArrayMapper extends ArrayMapper<SourceType, TargetType, any> {
    protected map(item: SourceType) {
      return config.map(item)
    }
    protected getExtractor() {
      return extractObservables
    }
    protected getUpdater() {
      return update
    }
  }

  return ArrayMapperClass
}
