import { LocalStorage } from './LocalStorage';
import { GameDefinition } from '../Views/Game';
import { updateGameConfig } from './ParseGameJSON';

interface GamesMap {
  [gameName: string]: GameDefinition
}

export type GameAddResponse =
 {
   status: 'ok'
 } |
 {
   status: 'error',
   errors: string[]
 }

export class GameStorage {
  constructor (private localStorage: LocalStorage) {
    const loadedGames = JSON.parse(localStorage.get(this.storageKey) || '{}')
    this.games =
      Object
        .keys(loadedGames)
        .reduce((games, gameName) => {
          const definition = loadedGames[gameName]

          games[gameName] = {
            ...definition,
            config: updateGameConfig(definition.config)
          }

          return games
        }, {} as GamesMap)
  }

  private storageKey = 'custom-games'

  private games: GamesMap

  public hasGame(name: string) {
    return this.getGame(name) != null
  }

  public getGame(name: string) {
    return this.games[name]
  }

  public addGame(name: string, definition: GameDefinition) {
    if (this.hasGame(name)) {
      return {
        status: 'error',
        errors: [
          'Game with such name already exists'
        ]
      } as GameAddResponse
    }
    this.games[name] = definition
    this.localStorage.set(this.storageKey, JSON.stringify(this.games))
    return {
      status: 'ok'
    } as GameAddResponse
  }

  public getGameNames() {
    return Object.keys(this.games)
  }
}