import { View } from './View'
import { createElement } from '../HTMLHelpers/CreateElement'
import { ButtonView } from './Button'

export class TabsView<
  Tabs extends { [key: string]: { name: string, content: View } }
> implements View {
  constructor(
    public readonly tabs: Tabs,
    private _currentTab: keyof Tabs,
    private className?: string
  ) {
    this.currentTab = _currentTab
    this.root.appendChild(this.tabHeadersWrapper)
    this.root.appendChild(this.tabsWrapper)
    this.tabHeaders.forEach(h => this.tabHeadersWrapper.appendChild(h.element))
    Object
      .keys(this.tabs)
      .forEach(
        key => this.tabsWrapper.appendChild(this.tabs[key].content.element)
      )
  }

  private set currentTab(tab: keyof Tabs) {
    Object
      .keys(this.tabs)
      .forEach(
        key => this.tabs[key].content.element.style.display = 'none'
      )
    this.tabs[tab].content.element.style.display = ''
    this.tabHeaders.forEach(t => t.element.classList.remove('tabs-view__tab-header--selected'))
    this.tabHeaders[Object.keys(this.tabs).indexOf(tab as any)].element.classList.add('tabs-view__tab-header--selected')
  }

  private root = createElement('div', ['tabs-view', this.className])
  private tabHeadersWrapper = createElement('div', ['tabs-view__tab-headers'])
  private tabsWrapper = createElement('div', ['tabs-view__tabs'])

  private tabHeaders = Object
    .keys(this.tabs)
    .map(
      key => new ButtonView(
        this.tabs[key].name,
        () => this.currentTab = key,
        'tabs-view__tab-header'
      ),
    )

  public get element() {
    return this.root
  }

  public destroy() {
    this.tabHeaders.forEach(b => b.destroy())
  }
}
