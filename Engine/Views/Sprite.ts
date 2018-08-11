import { View } from './View';

export interface SpriteConfig {
  x: number,
  y: number,
  width: number,
  height: number
}

export interface SpriteLocationV0 {
  x: number,
  y: number,
  z: number,
  rotation: number
}

export interface SpriteLocation {
  position: {
    x: number,
    y: number,
    z: number
  },
  rotation: number
}

export class SpriteView implements View {
  constructor(
    imageURL: string,
    config: SpriteConfig,
    name: string
  ) {
    this.image = document.createElement('div')
    this.image.classList.add('sprite-view')
    this.image.setAttribute('data-sprite-name', name)
    const s = this.image.style
    s.backgroundImage = `url("${imageURL}")`
    s.backgroundPosition = `${-config.x}px ${-config.y}px`
    s.width = `${config.width}px`
    s.height = `${config.height}px`
  }

  private image: HTMLDivElement

  public get element() {
    return this.image as HTMLElement
  }

  public destroy() {

  }

  private _visible = true

  public set visible(newValue: boolean) {
    this.image.style.display = newValue ? 'block' : 'none'
    this._visible = newValue
  }
}
