import { SpriteView } from './Sprite';
import { SpritesMap } from './Game';
import { View } from './View';

export class MultiSidedSpriteView<RenderedObject> implements View {
  constructor(
    private _renderedObject: RenderedObject,
    private spritesMap: SpritesMap,
    spriteSheetURL: string,
    sides: string[],
    private _currentSide: number,
    private handleDoubleClick?: () => void
  ) {
    this._element = document.createElement('div')
    this._element.classList.add('multi-sided-sprite-view')
    this.sprites = sides.map(side => {
      const sprite = new SpriteView(spriteSheetURL, this.spritesMap[side], side)
      sprite.visible = false
      this._element.appendChild(sprite.element)
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
      sprite.visible = index === newValue
    })
  }

  private sprites: SpriteView[]

  public destroy() {
    if (this.handleDoubleClick != null) {
      this.element.removeEventListener('dblclick', this.handleDoubleClick)
    }
  }
}
