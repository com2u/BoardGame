import { remove } from '../utils/array-utils'
import { Observer } from './observer'

export interface Emitter<Event> {
  subscribe(observer: Observer<Event>): void
  unsubscribe(observer: Observer<Event>): void
}

export abstract class Source<Subject> implements Emitter<Subject> {
  private observers: Observer<Subject>[] = []

  public subscribe(observer: Observer<Subject>) {
    this.observers.push(observer)
  }

  public unsubscribe(observer: Observer<Subject>) {
    remove(this.observers, observer)
  }

  protected dispatch(event: Subject) {
    this.observers.forEach(observer => observer(event))
  }

  public abstract initialize(): void

  public abstract destroy(): void
}

export class ExposedSource<Subject> extends Source<Subject> {
  public dispatch(value: Subject) {
    super.dispatch(value)
  }

  public initialize() {

  }

  public destroy() {

  }
}

export function mergeEmitters<SourceA, SourceB, Result>(
  sourceA: Emitter<SourceA>,
  sourceB: Emitter<SourceB>,
  combine: (a: SourceA | null, b: SourceB | null) => Result
): Emitter<Result> {
  let a = null as SourceA | null
  let b = null as SourceB | null

  const result = new ExposedSource<Result>()
  const handleUpdate = () => result.dispatch(combine(a, b))

  sourceA.subscribe(value => {
    a = value
    handleUpdate()
  })
  sourceB.subscribe(value => {
    b = value
    handleUpdate()
  })

  return result
}
