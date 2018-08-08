export interface IterationResult<Subject> {
  value: Subject,
  finished: boolean
}

export class NumericIterator {
  constructor(private from: number, private to: number) {
    if (from > to) {
      throw new RangeError(`Invalid iteration range`)
    }
    this.value = from
  }

  protected value: number

  public next(): IterationResult<number> | null {
    const result = this.getCurrentState()

    if (result.finished) {
      return null
    } else {
      this.value += 1
      return this.getCurrentState()
    }
  }

  public getCurrentState(): IterationResult<number> {
    return {
      finished: this.value === this.to,
      value: this.value
    }
  }

  public reset() {
    this.value = this.from
  }
}

export class LoopedNumericIterator extends NumericIterator {
  public next(): IterationResult<number> {
    if (this.getCurrentState().finished) {
      this.reset()
    } else {
      this.value += 1
    }
    return this.getCurrentState()
  }
}

export class LoppedMatrixIterator {
  constructor(width: number, height: number) {
    if (
      width < 0 ||
      height < 0
    ) {
      throw new RangeError(`Invalid arguments`)
    }

    this.xIterator = new LoopedNumericIterator(0, width)
    this.yIterator = new LoopedNumericIterator(0, height)
  }

  private xIterator: NumericIterator

  private yIterator: NumericIterator

  public next(): IterationResult<{ x: number, y: number }> {
    if (this.xIterator.getCurrentState().finished) {
      this.yIterator.next()
    }
    this.xIterator.next()

    return this.getCurrentState()
  }

  public getCurrentState(): IterationResult<{ x: number, y: number }> {
    const xState = this.xIterator.getCurrentState()
    const yState = this.yIterator.getCurrentState()

    return {
      value: {
        x: xState.value,
        y: yState.value
      },
      finished: xState.finished && yState.finished
    }
  }

  public reset() {
    this.xIterator.reset()
    this.yIterator.reset()
  }
}

export class LoopedArrayIterator<ItemType> {
  constructor(array: ItemType[]) {
    if (array.length === 0) {
      throw new Error(`Can't iterate over empty array`)
    }
    this.array = array.slice()
    this.indexIterator = new LoopedNumericIterator(0, this.array.length - 1)
  }

  private array: ItemType[]

  private indexIterator: LoopedNumericIterator

  public next() {
    this.indexIterator.next()
    return this.getCurrentState()
  }

  public getCurrentState(): IterationResult<ItemType> {
    const indexIterationState = this.indexIterator.getCurrentState()
    return {
      value: this.array[indexIterationState.value],
      finished: indexIterationState.finished
    }
  }

  public reset() {
    this.indexIterator.reset()
  }
}
