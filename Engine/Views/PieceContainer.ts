import { PieceContainerComponent } from './Game'
import { SpriteView } from './Sprite'
import { ContainerView } from './Container'
import { ButtonView } from './Button'
import { View } from './View'
import { LabelView } from './Label';

export class PieceContainerView implements View {
  constructor(
    private root: HTMLElement,
    private backgroundSprite: SpriteView,
    private containerConfig: PieceContainerComponent,
    private _itemsCount: number,
    private onShuffle: () => void,
    private onReset: () => void
  ) {

  }

  public get containerComponent() {
    return this.containerConfig
  }

  private controls = new ContainerView(
    {
      reset: new ButtonView('reset', () => this.onReset()),
      shuffle: new ButtonView('shuffle', () => this.onShuffle())
    },
    'piece-container-view__controls',
    {
      pointerdown: e => e.stopPropagation(),
      pointerup: e => e.stopPropagation()
    }
  )

  private container = new ContainerView(
    {
      itemsCountLabel: new LabelView(this.getItemsLabel(this._itemsCount), 'piece-container-view__items-count-label'),
      sprite: this.backgroundSprite,
      controls: this.controls
    },
    'piece-container-view'
  )

  public set itemsCount(newValue: number) {
    this.container.content.itemsCountLabel.text = `${newValue} items`
  }

  private getItemsLabel(count: number) {
    return `${count} items`
  }

  public get element() {
    return this.container.element
  }

  public destroy() {
    this.container.destroy()
  }
}
