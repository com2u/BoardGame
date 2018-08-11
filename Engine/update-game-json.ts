import { GameConfigV0, GameConfig, BoardComponent, PieceComponent, GameConfigV1 } from './Views/Game'
import { SpriteConfig } from './Views/Sprite';

export function updateGameStateFromV0ToV1(state: GameConfigV0) {
  const updated: GameConfigV1 = {
    version: '1',
    sprites: {},
    components: []
  }

  let lastSpriteName = 0;
  const spritesMap: { [key: string]: { name: string, sprite: SpriteConfig } } = {}

  updated.components = state.Components.map(c => {
    let existingSprite = spritesMap[JSON.stringify(c.source)]
    if (existingSprite == null) {
      lastSpriteName += 1
      existingSprite = {
        name: `sprite_${lastSpriteName}`,
        sprite: c.source
      }
      spritesMap[JSON.stringify(c.source)] = existingSprite
      updated.sprites[existingSprite.name] = existingSprite.sprite
    }
    const component: PieceComponent = {
      type: 'piece',
      category: null,
      name: c.name,
      sides: [existingSprite.name],
      currentSide: 0,
      location: {
        position: {
          x: c.target.x,
          y: c.target.y,
          z: 0
        },
        rotation: c.target.rotation
      }
    }

    return component
  })

  return updated
}

export function updateGameStateFromV1ToV2(state: GameConfigV1) {
  return {
    ...state,
    components: state.components.map(c => {
      if (c.type !== 'piece') {
        return c
      }
      const piece = c as PieceComponent
      const sprite = state.sprites[piece.sides[0]]
      return {
        ...c,
        location: {
          rotation: c.location.rotation,
          position: {
            x: c.location.position.x + Math.round(sprite.width / 2),
            y: c.location.position.y + Math.round(sprite.height / 2),
            z: c.location.position.z,
          }
        }
      }
    }),
    version: '2'
  } as GameConfig
}
