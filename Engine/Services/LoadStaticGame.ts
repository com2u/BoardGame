import { Loader } from '../json-loader'
import { parseGameJSON } from './ParseGameJSON';
import { GameDefinition } from '../Views/Game';

export function loadStaticGame(loader: Loader, folderName: string) {
  return loader
    .load(`Games/${folderName}/components.json`)
    .then(result => {
      return {
        boardImageURL: `Games/${folderName}/board.png`,
        componentsSpriteSheetURL: `Games/${folderName}/components.png`,
        config: parseGameJSON(result)
      } as GameDefinition
    })
}