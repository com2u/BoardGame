import { GameSelectionView } from "./GameSelection";
import { GameView, GameDefinition } from "./Game";
import { Loader } from "../json-loader";
import { GameUploadView } from "./GameUpload";
import { loadStaticGame } from "../Services/LoadStaticGame";
import { LocalStorage } from "../Services/LocalStorage";
import { GameStorage } from "../Services/GameStorage";

export class MainView {
  constructor (
    private loader: Loader,
    private root: HTMLElement
  ) {
    const menuElement = document.createElement('div')
    menuElement.classList.add('main-menu')
    root.appendChild(menuElement)

    this.gameElement = document.createElement('div')
    this.gameElement.classList.add('game-view')
    root.appendChild(this.gameElement)    

    const localStorage = new LocalStorage('board-game')
    this.gamesStorage = new GameStorage(localStorage)

    loader
      .loadJSON<{ gameFolders: string[] }>('games.json')
      .then(gamesConfig => {
        const GameSelection = new GameSelectionView(
          menuElement,
          gamesConfig.gameFolders.concat(this.gamesStorage.getGameNames()),
          gameId => {
            const customGame = this.gamesStorage.getGame(gameId)
            if (customGame != null) {
              this.selectGame(customGame)
            } else if (gamesConfig.gameFolders.indexOf(gameId)) {
              loadStaticGame(loader, gameId).then(game => this.selectGame(game))
            }
          }
        )
        const gameUploadView = new GameUploadView((name, game) => {
          const response = this.gamesStorage.addGame(name, game)
          if (response.status == 'error') {
            return response
          }
          GameSelection.options = gamesConfig.gameFolders.concat(this.gamesStorage.getGameNames())
          GameSelection.value = name
          this.selectGame(game)
          return response
        })
        menuElement.appendChild(gameUploadView.element)
        const firstGame = gamesConfig.gameFolders[0];
        if (firstGame == null) {
          throw new Error(`No games found in games.json`)
        }
        loadStaticGame(loader, firstGame).then(game => this.selectGame(game))
      })
  }

  private gamesStorage: GameStorage

  private gameElement: HTMLElement

  private Game: GameView | null = null

  private selectGame(game: GameDefinition) {
    if (this.Game != null) {
      this.Game.destroy()
    }

    this.Game = new GameView(game, this.gameElement)
  }
}