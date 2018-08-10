export class Loader {
  constructor(public baseUrl: string) {

  }

  public loadJSON<Response>(relativeUrl: string) {
    return loadJSON<Response>(`${this.baseUrl}/${relativeUrl}`)
  }

  public load(relativeUrl: string) {
    return fetch(`${this.baseUrl}/${relativeUrl}`).then(response => response.text())
  }
}

export function loadJSON<Response>(url: string): Promise<Response> {
  return fetch(url).then(response => response.json())
}