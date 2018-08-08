import { Emitter, Source } from './emitter'

export interface Readable<ValueType> extends Emitter<ValueType> {
  get(): ValueType
  bind(binder: (value: ValueType) => void): void
  map<TargetType>(mapper: (value: ValueType) => TargetType): Readable<TargetType>
}

export interface Writable<ValueType> {
  set(value: ValueType): void
  update(updater: (value: ValueType) => ValueType): void
}

export class Variable<ValueType> extends Source<ValueType> implements Readable<ValueType>, Writable<ValueType> {
  constructor(
    private value: ValueType,
    private _previousValue?: ValueType
  ) {
    super()

    if (typeof _previousValue === 'undefined') {
      this._previousValue = value
    }
  }

  public get() {
    return this.value as ValueType
  }

  public bind(binder: (value: ValueType) => void) {
    binder(this.value)
    this.subscribe(value => binder(value))
  }

  public getPreviousValue() {
    return this._previousValue
  }

  public set(value: ValueType) {
    this._previousValue = this.value
    this.value = value
    this.dispatch(value)
  }

  public update(updater: (value: ValueType) => ValueType) {
    this.set(updater(this.get()))
  }

  public map<TargetType>(mapper: (value: ValueType) => TargetType): Readable<TargetType> {
    const result = new Variable<TargetType>(mapper(this.get()))

    this.subscribe(value => result.set(mapper(value)))

    return result
  }

  public initialize() {

  }

  public destroy() {

  }
}

export function combineValues<A, B, Result>(
  values: [
    Readable<A>,
    Readable<B>
  ],
  combine: (a: A, b: B) => Result
): Readable<Result>
export function combineValues<A, B, C, Result>(
  values: [
    Readable<A>,
    Readable<B>,
    Readable<C>
  ],
  combine: (a: A, b: B, c: C) => Result
): Readable<Result>
export function combineValues<Result>(
  values: Readable<any>[],
  combine: (...values: any[]) => Result
): Readable<Result> {
  const compute = () => combine(...values.map(v => v.get()))
  const result = new Variable<Result>(compute())
  const handleUpdate = () => result.set(compute())

  values.forEach(v => v.subscribe(handleUpdate))

  return result
}

export function computeIfPresent<A, B>(
  a: Readable<A | null>,
  compute: (a: A) => Readable<B>
) {
  const result = new Variable<B | null>(null)
  let lastB = null as Readable<B> | null

  const listener = (b: B) => result.set(b)

  const handleNewValue = (value: A | null) => {
    if (value != null) {
      if (lastB != null) {
        lastB.unsubscribe(listener)
      }
      lastB = compute(value)
      lastB.subscribe(listener)
    } else {
      if (lastB != null) {
        lastB.unsubscribe(listener)
        lastB = null
        result.set(null)
      }
    }
  }

  handleNewValue(a.get())

  a.subscribe(handleNewValue)

  return result
}
