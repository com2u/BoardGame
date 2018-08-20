import { SpriteLocationV0, SpriteConfig, SpriteView, SpriteLocation } from './Sprite'
import { MovablePieceView, MovablePieceLocation } from './MovablePiece'
import { MultiSidedSpriteView } from './MultiSidedSprite'
import { PieceContainerView } from './PieceContainer'
import { shuffle } from '../random-utils'
import { GameStateContainer } from './GameStateStore'
import { View } from './View'
import { ContainerView } from './Container'
import { createElement } from '../HTMLHelpers/CreateElement'

export type ComponentType = 'piece' | 'container'

export interface BoardComponent {
  type: ComponentType,
  category: string | null,
  name: string,
  location: SpriteLocation
}

export interface PieceComponent extends BoardComponent {
  type: 'piece',
  sides: string[],
  currentSide: number
}

export interface PieceContainerComponent extends BoardComponent {
  type: 'container',
  category: string,
  backgroundSprite: string
}

export interface SpritesMap {
  [spriteName: string]: SpriteConfig
}

export interface GameDefinition {
  boardImageURL: string,
  componentsSpriteSheetURL: string,
  config: GameConfig
}

export interface GameConfig {
  version: '2',
  sprites: SpritesMap,
  components: BoardComponent[]
}

export interface GameConfigV1 {
  version: '1',
  sprites: SpritesMap,
  components: BoardComponent[]
}

export interface GameConfigV0 {
  Components: {
    name: string,
    source: SpriteConfig,
    target: SpriteLocationV0
  }[]
}

export class GameView implements View {
  constructor(
    private gameName: string,
    private gameDefinition: GameDefinition,
    private gameStateContainer: GameStateContainer
  ) {
    this.gameConfig = gameDefinition.config

    this.gameStateContainer.state.map(components => {
      this.updateComponentPositions(components)
    })
  }

  private board = createElement('div', ['game-view__board'])

  private root = new ContainerView({
    board: this.board,
    currentActorLabel: createElement('div', ['game-view__current-actor'])
  }, 'game-view')

  private updateComponentPositions(components: BoardComponent[]) {
    if (this.gameConfig == null) {
      return
    }
    const newConfig = {
      ...this.gameConfig,
      components
    }
    const rotatedElementIndex = this.pieces.findIndex(p => p.showRotationHandle)
    this.destroyBoard()
    this.createBoard(newConfig, rotatedElementIndex)
    this.updateItemsAssignedToContainers()
  }

  private pieces: MovablePieceView<MultiSidedSpriteView<PieceComponent>>[] = []

  private containers: MovablePieceView<PieceContainerView>[] = []

  private background: HTMLImageElement | null = null

  private gameConfig: GameConfig | null = null

  private createBoard(config: GameConfig, rotatedElementIndex: number | null) {
    if (this.gameStateContainer == null) {
      return
    }

    this.background = document.createElement('img')
    this.background.src = this.gameDefinition.boardImageURL
    this.background.setAttribute('draggable', 'false')
    this.board.appendChild(this.background)

    const sprites =
      config
        .components
        .filter(component => component.type === 'piece')
        .map((c, index) => {
          const piece = c as PieceComponent
          const sprite = new MultiSidedSpriteView(
            piece,
            config.sprites,
            this.gameDefinition.componentsSpriteSheetURL,
            piece.sides,
            piece.currentSide,
            () => {
              const newCurrentSide = (piece.currentSide + 1) % piece.sides.length

              if (piece.currentSide !== newCurrentSide && this.gameStateContainer != null) {
                const newState = this.gameStateContainer.state.get().map(_c => {
                  if (_c === piece) {
                    return {
                      ...piece,
                      currentSide: newCurrentSide
                    }
                  } else {
                    return _c
                  }
                })
                this.gameStateContainer.addState(
                  newState,
                  'flip_piece'
                )
              }
            }
          )
          const pieceView = new MovablePieceView(
            `[${index}] ${piece.name}`,
            piece.location,
            sprite,
            newLocation => {
              if (this.gameStateContainer != null) {
                this.gameStateContainer.movePiece(piece, newLocation)
              }
            },
            p => {
              this.root.content.currentActorLabel.innerHTML = `Current component - ${p.name}`
              this.bringToTop(p)
            },
            1,
            rotatedElementIndex === index
          )
          this.board.appendChild(pieceView.element)
          if (this.wasMounted) {
            pieceView.mounted()
          }
          return pieceView
        })

    const pieceContainers =
      config
        .components
        .filter(c => c.type === 'container')
        .map(c => {
          const container = c as PieceContainerComponent
          const sprite = new SpriteView(
            this.gameDefinition.componentsSpriteSheetURL,
            config.sprites[container.backgroundSprite],
            container.backgroundSprite
          )
          const piece: MovablePieceView<PieceContainerView> = new MovablePieceView<PieceContainerView>(
            container.name,
            container.location,
            new PieceContainerView(
              this.board,
              sprite,
              container,
              0,
              () => this.shufflePieces(piece),
              () => this.resetPieces(piece)
            ),
            newLocation => {
              if (this.gameStateContainer != null) {
                this.gameStateContainer.movePiece(container, newLocation)
              }
            },
            () => {}
          )

          this.board.appendChild(piece.element)
          if (this.wasMounted) {
            piece.mounted()
          }
          return piece
        })

    this.containers.push(...pieceContainers)
    this.pieces.push(...sprites)
  }

  private wasMounted = false

  public mounted() {
    this.wasMounted = true
    this.containers.forEach(c => c.mounted())
    this.pieces.forEach(p => p.mounted())
  }

  private containerToPieceMap = new Map<MovablePieceView<PieceContainerView>, MovablePieceView<MultiSidedSpriteView<PieceComponent>>[]>()

  private pieceToContainerMap = new Map<MovablePieceView<MultiSidedSpriteView<PieceComponent>>, MovablePieceView<PieceContainerView>>()

  private updateItemsAssignedToContainers() {
    this.containerToPieceMap = new Map<MovablePieceView<PieceContainerView>, MovablePieceView<MultiSidedSpriteView<PieceComponent>>[]>()
    this.pieces.forEach(piece => {
      for (const container of this.containers) {
        let assignedItems: MovablePieceView<MultiSidedSpriteView<PieceComponent>>[]
        if (this.containerToPieceMap.has(container)) {
          assignedItems = this.containerToPieceMap.get(container) as MovablePieceView<MultiSidedSpriteView<PieceComponent>>[]
        } else {
          assignedItems = []
          this.containerToPieceMap.set(container, assignedItems)
        }

        if (this.pieceBelongsToContainer(container.content.containerComponent, piece.content.renderedObject)) {
          assignedItems.push(piece)
          this.pieceToContainerMap.set(piece, container)
        }
      }
    })
    this.containers.forEach(c => {
      const items = this.containerToPieceMap.get(c)
      if (items == null) {
        throw new Error('Items were not assigned for container')
      }
      c.content.itemsCount = items.length
    })
  }

  private pieceBelongsToContainer(container: PieceContainerComponent, piece: PieceComponent) {
    if (this.gameConfig == null) {
      throw new Error('Game state is not initialized')
    }
    const containerSprite = this.gameConfig.sprites[container.backgroundSprite]
    const position = piece.location.position

    return (
      position.x >= (container.location.position.x - containerSprite.width / 2) &&
      position.x <= (container.location.position.x + containerSprite.width / 2) &&
      position.y >= (container.location.position.y - containerSprite.height / 2) &&
      position.y <= (container.location.position.y + containerSprite.height / 2)
    )
  }

  private resetPieces(container: MovablePieceView<PieceContainerView>) {
    if (this.gameStateContainer == null) {
      return
    }

    const newState = this.gameStateContainer.state.get().map(c => {
      if (c.type === 'piece' && c.category === container.content.containerComponent.category) {
        const newLocation: MovablePieceLocation = {
          rotation: container.location.rotation,
          position: {
            ...container.location.position,
            z: Math.max(c.location.position.z, container.location.position.z + 1)
          }
        }
        return {
          ...c,
          location: newLocation
        }
      } else {
        return c
      }
    })

    this.gameStateContainer.addState(newState, 'move_pieces_to_container')
  }

  private shufflePieces(container: MovablePieceView<PieceContainerView>) {
    if (this.gameStateContainer == null) {
      return
    }

    const items = this.containerToPieceMap.get(container)

    if (items == null) {
      throw new Error('Items were not assigned to the container')
    }

    const shuffled = shuffle(items)
    const map = shuffled.reduce((m, item, index) => {
      m.set(item.content.renderedObject, index)
      return m
    }, new Map<BoardComponent, number>())
    const newState = this.gameStateContainer.state.get().map(c => {
      const shuffledItemIndex = map.get(c)
      if (shuffledItemIndex == null) {
        return c
      }
      return {
        ...c,
        location: {
          ...c.location,
          position: {
            ...c.location.position,
            z: shuffledItemIndex + container.location.position.z + 1
          }
        }
      }
    })
    this.gameStateContainer.addState(newState, 'shuffle_pieces')
  }

  public bringToTop(piece: MovablePieceView<MultiSidedSpriteView<PieceComponent>>) {
    this
      .pieces
      .sort((elementA, elementB) => {
        const a = elementA.location.position
        const b = elementB.location.position
        if (a.z > b.z) {
          return 1
        }
        if (a.z < b.z) {
          return -1
        }
        return 0
      })
      .forEach((element, index) => {
        const newLocation = {
          position: {
            ...element.location.position,
            z: index
          },
          rotation: element.location.rotation
        }
        element.setLocation(newLocation)
      })

    piece.setLocation({
        rotation: piece.location.rotation,
        position: {
          ...piece.location.position,
          z: this.pieces.length
        }
      })
  }

  public get element() {
    return this.root.element
  }

  public destroy() {
    this.destroyBoard()
    this.root.destroy()
  }

  private destroyBoard() {
    if (this.background != null) {
      this.board.removeChild(this.background)
    }
    // this.root.removeChild(this.board)
    this.pieces.forEach(element => {
      this.board.removeChild(element.element)
      element.destroy()
    })
    this.containers.forEach(container => {
      this.board.removeChild(container.element)
      container.destroy()
    })
    this.pieces = []
    this.containers = []
  }
}
