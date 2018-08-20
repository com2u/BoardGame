import { GameSelectionView } from './GameSelection';
import { GameView, GameDefinition, GameConfig } from './Game';
import { Loader } from '../json-loader';
import { GameUploadView } from './GameUpload';
import { loadStaticGame } from '../Services/LoadStaticGame';
import { LocalStorage } from '../Services/LocalStorage';
import { GameStorage } from '../Services/GameStorage';
import { ContainerView } from './Container';
import { SlotView } from './Slot';
import { View } from './View';
import { SectionView } from './Section';
import { TabsView } from './TabsView';
import { JSONView } from './JSON';
import { GameStateContainer } from './GameStateStore';
import { ButtonView } from './Button';
import { downloadJsonFile } from '../download-file';
import { GameHistoryView } from './GameHistory';

interface StaticGamesConfig {
  gameFolders: string[]
}

export class MainView implements View {
  constructor(
    loader: Loader
  ) {
    const localStorage = new LocalStorage('board-game')
    this.gamesStorage = new GameStorage(localStorage)

    loader
      .loadJSON<StaticGamesConfig>('games.json')
      .then(gamesConfig => {
        const gameSelection = new GameSelectionView(
          gamesConfig.gameFolders.concat(this.gamesStorage.getGameNames()),
          gameId => {
            const customGame = this.gamesStorage.getGame(gameId)
            if (customGame != null) {
              this.selectGame(gameId, customGame)
            } else if (gamesConfig.gameFolders.indexOf(gameId) !== -1) {
              loadStaticGame(loader, gameId).then(game => this.selectGame(gameId, game))
            }
          }
        )
        this.root.content.menu.content.content = gameSelection
        const firstGameName = gamesConfig.gameFolders[0]
        gameSelection.value = firstGameName
        if (firstGameName == null) {
          throw new Error(`No games found in games.json`)
        }
        loadStaticGame(loader, firstGameName).then(game => this.selectGame(firstGameName, game))
      })
  }

  private wasMounted = false

  public mounted() {
    this.wasMounted = true
    const game = this.root.content.center.content.gameSlot.content
    if (game != null) {
      game.mounted()
    }
  }

  private staticGamesConfig: StaticGamesConfig | null = null

  private handleGameUpload = (name: string, game: GameDefinition) => {
    const response = this.gamesStorage.addGame(name, game)
    if (response.status === 'error') {
      return response
    }
    this.selectGame(name, game)
    const gameSelection = this.root.content.menu.content.content
    if (gameSelection != null) {
      const staticGames = this.staticGamesConfig != null ? this.staticGamesConfig.gameFolders : []
      gameSelection.options = staticGames.concat(this.gamesStorage.getGameNames())
      gameSelection.value = name
    }
    return response
  }

  private JSONViewInput = new JSONView<GameConfig>(
    {
      version: '2',
      sprites: {},
      components: []
    },
    newConfig => {
      this.gameConfig = newConfig
      if (this.gameStateContainer != null) {
        this.gameStateContainer.addState(newConfig.components, 'changed_in_json_editor')
      }
    },
    'game-state-json-editor'
  )

  private root = new ContainerView({
    menu: new SectionView(
      'Select game',
      new SlotView<GameSelectionView>('main-menu-slot', null),
      'select-game-section'
    ),
    center: new ContainerView({
      gameSlot: new SlotView<GameView>('game-view-slot', null)
    }),
    rightMenu: new TabsView(
      {
        history: {
          name: 'Moves History',
          content: new SlotView<GameHistoryView>('game-history-slot', null)
        },
        saveLoad: {
          name: 'Game State',
          content: new ContainerView({
            buttons: new ContainerView({
              save: new ButtonView(
                'Save',
                () => downloadJsonFile(
                  `${this.gameName}.json`,
                  JSON.stringify(this.gameConfig, null, 2)
                )
              )
            }, 'safe-load-buttons'),
            editor: this.JSONViewInput,
          })
        },
        uploadGame: {
          name: 'Upload Game',
          content: new GameUploadView(this.handleGameUpload)
        },
      },
      'history',
      'right-menu-tabs'
    )
  }, 'main-view')

  private gamesStorage: GameStorage

  private gameName: string | null = null

  private gameConfig: GameConfig | null = null

  private gameStateContainer: GameStateContainer | null = null

  private historyView?: GameHistoryView

  private selectGame(name: string, game: GameDefinition) {
    this.gameName = name
    this.gameStateContainer = new GameStateContainer(game.config.components)
    this.gameConfig = game.config
    this.gameStateContainer.state.bind(components => {
      if (this.gameConfig != null) {
        this.JSONViewInput.setValue({
          ...this.gameConfig,
          components
        })
      }
    })
    const gameView = new GameView(name, game, this.gameStateContainer)
    this.historyView = new GameHistoryView(this.gameStateContainer)
    this.root.content.rightMenu.tabs.history.content.content = this.historyView
    this.root.content.center.content.gameSlot.content = gameView
    if (this.wasMounted) {
      gameView.mounted()
    }
  }

  public get element() {
    return this.root.element
  }

  public destroy() {
    this.root.destroy()
  }
}
