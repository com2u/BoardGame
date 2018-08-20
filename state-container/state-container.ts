import { Observer } from '../reaction-framework/observer'

interface ObjectWatchersRegistry<State> {
  watchers: any[],
  childRegistry: {
    [key in keyof State]?: ObjectWatchersRegistry<State[key]>
  },
  childAddedWatchers: any[],
  childRemovedWatchers: any[]
}

export interface StateContainer<State> {
  watch<Key extends keyof State>(key: Key, observer: Observer<State[Key]>): void
  get<Key extends keyof State>(key: Key): State[Key]
  set<Key extends keyof State>(key: Key, value: State[Key]): void
  select<Key extends keyof State>(key: Key): StateContainer<State[Key]>
}

function notifyWatchers<State, Key extends keyof State>(
  state: State,
  registry: ObjectWatchersRegistry<State>,
  key: Key,
  newValue: State[Key]
) {
  const oldValue =
    typeof state === 'undefined'
      ? state
      : state[key]
  const subRegistry = registry.childRegistry[key]

  if (typeof oldValue === 'undefined' && typeof newValue !== 'undefined') {
    registry.childAddedWatchers.forEach(w => w(newValue))
  }

  if (typeof newValue === 'undefined') {
    registry.childRemovedWatchers.forEach(w => w(oldValue))
    return
  }

  if (subRegistry != null) {
    subRegistry.watchers.forEach(watcher => watcher(newValue))

    for (const [childKey, childRegistry] of Object.entries(subRegistry.childRegistry)) {
      notifyWatchers<any, any>(state[key], subRegistry as any, childKey, (newValue as any)[childKey])
    }
  }
}

export class RootStateContainer<State> implements StateContainer<State> {
  constructor(private state: State) {

  }

  protected watchersRegistry: ObjectWatchersRegistry<State> = {
    watchers: [],
    childRegistry: {},
    childAddedWatchers: [],
    childRemovedWatchers: []
  }

  public watch<Key extends keyof State>(key: Key, observer: Observer<State[Key]>) {
    this.getRegistryItem(key).watchers.push(observer)
  }

  public get<Key extends keyof State>(key: Key) {
    return this.state[key]
  }

  public set<Key extends keyof State>(key: Key, value: State[Key]) {
    notifyWatchers(this.state, this.watchersRegistry, key, value)
    this.state[key] = value
  }

  private getRegistryItem<Key extends keyof State>(key: Key): ObjectWatchersRegistry<State[Key]> {
    const registryItem = this.watchersRegistry.childRegistry[key]

    if (registryItem != null) {
      return registryItem as ObjectWatchersRegistry<State[Key]>
    }

    const newRegistryItem = {
      watchers: [],
      childRegistry: {},
      childAddedWatchers: [],
      childRemovedWatchers: []
    }
    this.watchersRegistry.childRegistry[key] = newRegistryItem
    return newRegistryItem
  }

  public select<Key extends keyof State>(key: Key): StateContainer<State[Key]> {
    return new StateContainerProxy<State, Key>(this, key, this.getRegistryItem(key))
  }

}

class StateContainerProxy<State, Key extends keyof State> implements StateContainer<State[Key]> {
  constructor(
    private parentContainer: StateContainer<State>,
    private key: Key,
    private watchersRegistry: ObjectWatchersRegistry<State[Key]>
  ) {

  }

  public watch<SubKey extends keyof State[Key]>(key: SubKey, observer: Observer<State[Key][SubKey]>) {
    this.getRegistryItem(key).watchers.push(observer)
  }

  public get<SubKey extends keyof State[Key]>(key: SubKey) {
    return this.parentContainer.get(this.key)[key]
  }

  public set<SubKey extends keyof State[Key]>(key: SubKey, value: State[Key][SubKey]) {
    notifyWatchers(this.parentContainer.get(this.key), this.watchersRegistry, key, value)
    this.parentContainer.get(this.key)[key] = value
  }

  private getRegistryItem<SubKey extends keyof State[Key]>(key: SubKey): ObjectWatchersRegistry<State[Key][SubKey]> {
    const registryItem = this.watchersRegistry.childRegistry[key]

    if (registryItem != null) {
      return registryItem as ObjectWatchersRegistry<State[Key][SubKey]>
    }

    const newRegistryItem = {
      watchers: [],
      childRegistry: {},
      childAddedWatchers: [],
      childRemovedWatchers: []
    }
    this.watchersRegistry.childRegistry[key] = newRegistryItem
    return newRegistryItem
  }

  public select<SubKey extends keyof State[Key]>(key: SubKey): StateContainer<State[Key][SubKey]> {
    return new StateContainerProxy<State[Key], SubKey>(this, key, this.getRegistryItem(key))
  }
}
