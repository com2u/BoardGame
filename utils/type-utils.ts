export interface Constructor<Subject> {
  new(...args: any[]): Subject
}

export interface Destroyable {
  destroy(): void
}

export type Readonly<Subject> = {
  readonly [key in keyof Subject]: Subject[key]
}
