import { updateGameStateFromV1ToV2, updateGameStateFromV0ToV1 } from '../update-game-json'
import { GameConfigV0, GameConfigV1, GameConfig } from '../Views/Game'

export function parseGameJSON(json: string) {
  return updateGameConfig(JSON.parse(json))
}

export function updateGameConfig(gameConfig: any) {
  if (gameConfig.version == null) {
    return updateGameStateFromV1ToV2(updateGameStateFromV0ToV1(gameConfig as GameConfigV0))
  } else if (gameConfig.version === '1') {
    return updateGameStateFromV1ToV2(gameConfig as GameConfigV1)
  } else if (gameConfig.version === '2') {
    return gameConfig as GameConfig
  } else {
    throw new Error('Unsupported game config loaded')
  }
}