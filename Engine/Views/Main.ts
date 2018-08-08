import { GameSelectionView } from "./GameSelection";
import { GameView } from "./Game";
import { JSONLoader } from "../json-loader";

export class MainView {
  constructor (
    private loader: JSONLoader,
    private root: HTMLElement
  ) {
    const menuElement = document.createElement('div')
    menuElement.classList.add('main-menu')
    root.appendChild(menuElement)

    this.gameElement = document.createElement('div')
    this.gameElement.classList.add('game-view')
    root.appendChild(this.gameElement)    

    loader
      .loadJSON<{ gameFolders: string[] }>('games.json')
      .then(gamesConfig => {
        const GameSelection = new GameSelectionView(
          menuElement,
          gamesConfig.gameFolders,
          game => this.selectGame(game)
        )
        const firstGame = gamesConfig.gameFolders[0];
        if (firstGame == null) {
          throw new Error(`No games found in games.json`)
        }
        this.selectGame(firstGame)
      })
  }

  private gameElement: HTMLElement

  private Game: GameView | null = null

  private selectGame(gameId: string) {
    if (this.Game != null) {
      this.Game.destroy()
    }
    this.Game = new GameView(this.loader, gameId, this.gameElement)
  }
}