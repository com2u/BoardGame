import { GameStateContainer, GameStateHistoryItem } from './GameStateStore'
import { ContainerView } from './Container'
import { ButtonView } from './Button'
import { View } from './View'
import { LabelView } from './Label';
import { ListView } from './List';

export class GameHistoryView implements View {
  constructor(private gameStateContainer: GameStateContainer) {
    gameStateContainer.history.itemAdded.subscribe(() => this.handleCountUpdate())
    gameStateContainer.history.itemRemoved.subscribe(() => this.handleCountUpdate())
    this.handleCountUpdate()
  }

  private handleCountUpdate() {
    const count = this.gameStateContainer.history.items.length
    const label =
      count === 0
        ? 'History is empty'
        : `Items in history: ${count}`
    this.view.content.countLabel.text = label
    this.undoButton.element.disabled = count === 0
  }

  private undoButton = new ButtonView(
    'Undo',
    () => this.gameStateContainer.unwindHistory()
  )

  private view = new ContainerView(
    {
      countLabel: new LabelView(
        '',
        'game-history-view--items-count-label'
      ),
      controls: new ContainerView(
        {
          undoButton: this.undoButton
        }
      ),
      historyWrapper: new ContainerView({
        historyItemsList: new ListView<GameStateHistoryItem>(
          this.gameStateContainer.history,
          item => {
            return new ContainerView(
              {
                name: new LabelView(item.action, 'history-list__item__name'),
                time: new LabelView(item.time.toLocaleTimeString(), 'history-list__item__time')
              },
              'history-list__item'
            )
          },
          'history-list',
          list => [...list].reverse()
        )
      }, 'history-wrapper')
    }
  )

  public get element() {
    return this.view.element
  }

  public destroy() {
    this.view.destroy()
  }
}
