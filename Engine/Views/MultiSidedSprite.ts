import { SpriteView } from "./Sprite";
import { SpritesMap } from "./Game";

export class MultiSidedSpriteView<RenderedObject> {
  constructor (
    private root: HTMLElement,
    private _renderedObject: RenderedObject,
    private spritesMap: SpritesMap,
    spriteSheetURL: string,
    sides: string[],
    private _currentSide: number,
    private handleDoubleClick?: () => void
  ) {
    this._element = document.createElement('div')
    this._element.classList.add('multi-sided-sprite-view')
    this.root.appendChild(this._element)
    this.sprites = sides.map(side => {
      const sprite = new SpriteView(this._element, spriteSheetURL, this.spritesMap[side], side)
      sprite.visible = false
      return sprite
    })
    this.currentSide = _currentSide
    if (handleDoubleClick != null) {
      this._element.addEventListener('dblclick', handleDoubleClick)
    }
  }

  private _element: HTMLElement

  public get element() {
    return this._element
  }

  public get renderedObject() {
    return this._renderedObject
  }

  public get currentSide() {
    return this._currentSide
  }

  public set currentSide(newValue: number) {
    this._currentSide = newValue
    this.sprites.forEach((sprite, index) => {
      sprite.visible = index == newValue
    })
  }

  private sprites: SpriteView[]

  public destroy() {
    if (this.handleDoubleClick != null) {
      this.element.removeEventListener('dblclick', this.handleDoubleClick)
    }
  }
}