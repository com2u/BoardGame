export interface Consumer<Value> {
  created(value: Value): void
  updated(value: Value): void
  destroyed(): void
}
