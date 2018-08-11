import { GameSelectionView } from './GameSelection';
import { GameView, GameDefinition } from './Game';
import { Loader } from '../json-loader';
import { GameUploadView } from './GameUpload';
import { loadStaticGame } from '../Services/LoadStaticGame';
import { LocalStorage } from '../Services/LocalStorage';
import { GameStorage } from '../Services/GameStorage';
import { ContainerView } from './Container';
import { SlotView } from './Slot';
import { View } from './View';

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
        this.root.content.menuSlot.content = gameSelection
        const firstGameName = gamesConfig.gameFolders[0];
        if (firstGameName == null) {
          throw new Error(`No games found in games.json`)
        }
        loadStaticGame(loader, firstGameName).then(game => this.selectGame(firstGameName, game))
      })
  }

  private wasMounted = false

  public mounted() {
    this.wasMounted = true
    const game = this.root.content.gameSlot.content
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
    const gameSelection = this.root.content.menuSlot.content
    if (gameSelection != null) {
      const staticGames = this.staticGamesConfig != null ? this.staticGamesConfig.gameFolders : []
      gameSelection.options = staticGames.concat(this.gamesStorage.getGameNames())
      gameSelection.value = name
    }
    return response
  }

  private root = new ContainerView({
    menu: new ContainerView({
      gameUpload: new GameUploadView(this.handleGameUpload)
    }, 'main-menu'),
    menuSlot: new SlotView<GameSelectionView>('main-menu-slot', null),
    gameSlot: new SlotView<GameView>('game-view-slot', null)
  })

  private gamesStorage: GameStorage

  private selectGame(name: string, game: GameDefinition) {
    const gameView = new GameView(name, game)
    this.root.content.gameSlot.content = gameView
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
