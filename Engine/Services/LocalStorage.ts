export class LocalStorage {
  constructor(private key: string) {

  }

  public get(key: string) {
    return localStorage.getItem(this.getKey(key))
  }

  private getKey(key: string) {
    return `${this.key}_${key}`
  }

  public set(key: string, value: string) {
    localStorage.setItem(this.getKey(key), value)
  }
}