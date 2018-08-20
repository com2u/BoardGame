import { View } from './View'
import { ContainerView } from './Container';
import { LabelView } from './Label';
import { SlotView } from './Slot';

export class SectionView<Content extends View> implements View {
  constructor(
    private name: string,
    private _content: Content,
    private className: string
  ) {

  }

  private root = new ContainerView({
    header: new LabelView(this.name, 'section-view__name'),
    contentSlot: new SlotView<Content>('content-view__content', this._content)
  }, [this.className, 'section-view'])

  public get content() {
    return this.root.content.contentSlot.content as Content
  }

  public set content(content: Content) {
    this.root.content.contentSlot.content = content
  }

  public get element() {
    return this.root.element
  }

  public mounted() {
    if (this._content.mounted != null) {
      this._content.mounted()
    }
  }

  public destroy() {
    this.root.destroy()
  }
}
