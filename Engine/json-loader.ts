export class JSONLoader {
  constructor(public baseUrl: string) {

  }

  public loadJSON<Response>(relativeUrl: string) {
    return loadJSON<Response>(`${this.baseUrl}/${relativeUrl}`)
  }
}

export function loadJSON<Response>(url: string): Promise<Response> {
  return fetch(url).then(response => response.json())
}