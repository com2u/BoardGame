import { Loader } from '../json-loader'
import { SpriteLocationV0, SpriteConfig, SpriteView, SpriteLocation } from './Sprite'
import { JSONView } from './JSON'
import { CheckBoxField } from './CheckBoxField'
import { ButtonView } from './Button'
import { postJSON } from '../post-json'
import { downloadJsonFile } from '../download-file'
import { updateGameStateFromV0ToV1, updateGameStateFromV1ToV2 } from '../update-game-json'
import { MovablePieceView, MovablePieceLocation } from './MovablePiece'
import { MultiSidedSpriteView } from './MultiSidedSprite';
import { PieceContainerView } from './PieceContainer';
import { shuffle } from '../random-utils';
import { GameStateContainer } from './GameStateStore';
import { GameHistoryView } from './GameHistory';
import { parseGameJSON } from '../Services/ParseGameJSON';

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

export class GameView {
  constructor (
    private gameDefinition: GameDefinition,
    private root: HTMLElement
  ) {
    this.board = document.createElement('div')
    this.board.classList.add('game-view__board')
    this.root.appendChild(this.board)

    this.currentActorLabel = document.createElement('div')
    this.currentActorLabel.classList.add('game-view__current-actor')
    this.root.appendChild(this.currentActorLabel)

    this.showJSONViewField = new CheckBoxField(
      this.root,
      'Show game state: ',
      showJSON => {
        if (showJSON) {
          this.root.classList.add('game-view--show-game-state-json')
        } else {
          this.root.classList.remove('game-view--show-game-state-json')
        }
      },
    )

    this.JSONView = new JSONView<GameConfig>(
      root,
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
      }
    )

    this.saveButton = new ButtonView(
      this.root,
      'Save',
      () => downloadJsonFile(`${'components'}.json`, JSON.stringify(this.gameConfig, null, 2))
    )

   
    this.gameConfig = gameDefinition.config
    this.gameStateContainer = new GameStateContainer(gameDefinition.config.components)
    this.gameStateContainer.state.map(components => {
      this.updateComponentPositions(components)
      if (this.gameConfig != null) {
        this.JSONView.setValue({
          ...this.gameConfig,
          components
        })
      }
    })
  }

  private updateComponentPositions(components: BoardComponent[]) {
    if (this.gameConfig == null) {
      return
    }
    const newConfig = {
      ...this.gameConfig,
      components
    }
    this.JSONView.setValue(newConfig)
    this.destroyBoard()
    this.createBoard(newConfig)
    this.updateItemsAssignedToContainers()
  }

  private gameStateContainer: GameStateContainer | null = null

  private pieces: MovablePieceView<MultiSidedSpriteView<PieceComponent>>[] = []

  private containers: MovablePieceView<PieceContainerView>[] = []

  private board: HTMLDivElement

  private background: HTMLImageElement | null = null

  private currentActorLabel: HTMLDivElement

  private showJSONViewField: CheckBoxField

  private saveButton: ButtonView

  private JSONView: JSONView<GameConfig>

  private historyView?: GameHistoryView

  private gameConfig: GameConfig | null = null

  private createBoard(config: GameConfig) {
    if (this.gameStateContainer == null) {
      return
    }

    this.background = document.createElement('img')
    this.background.src = this.gameDefinition.boardImageURL
    this.background.setAttribute('draggable', 'false')
    this.board.appendChild(this.background)
    
    this.historyView = new GameHistoryView(this.gameStateContainer)
    this.root.appendChild(this.historyView.element)
    const sprites =
      config
        .components
        .filter(component => component.type == 'piece')
        .map((c, index) => {
          const piece = c as PieceComponent
          const sprite = new MultiSidedSpriteView(
            this.board,
            piece,
            config.sprites,
            this.gameDefinition.componentsSpriteSheetURL,
            piece.sides,
            piece.currentSide,
            () => {
              const newCurrentSide = (piece.currentSide + 1) % piece.sides.length

              if (piece.currentSide !== newCurrentSide && this.gameStateContainer != null) {
                const newState = this.gameStateContainer.state.get().map(c => {
                  if (c === piece) {
                    return {
                      ...piece,
                      currentSide: newCurrentSide
                    }
                  } else {
                    return c
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
            this.board,
            `[${index}] ${piece.name}`,
            piece.location,
            sprite,
            newLocation => {
              if (this.gameStateContainer != null) {
                this.gameStateContainer.movePiece(piece, newLocation)
              }
            },
            piece => {
              this.currentActorLabel.innerHTML = `Current component - ${piece.name}`
              this.bringToTop(piece)
            },
            1
          )

          return pieceView
        })
    
    const pieceContainers =
        config
          .components
          .filter(c => c.type === 'container')
          .map(c => {
            const container = c as PieceContainerComponent
            const sprite = new SpriteView(
              null,
              this.gameDefinition.componentsSpriteSheetURL,
              config.sprites[container.backgroundSprite],
              container.backgroundSprite
            )
            const piece: MovablePieceView<PieceContainerView> = new MovablePieceView<PieceContainerView>(
              this.board,
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

            return piece
          })
    
    this.containers.push(...pieceContainers)
    this.pieces.push(...sprites)
  }

  private containerToPieceMap = new Map<MovablePieceView<PieceContainerView>, MovablePieceView<MultiSidedSpriteView<PieceComponent>>[]>()

  private pieceToContainerMap = new Map<MovablePieceView<MultiSidedSpriteView<PieceComponent>>, MovablePieceView<PieceContainerView>>()

  private updateItemsAssignedToContainers() {
    this.containerToPieceMap = new Map<MovablePieceView<PieceContainerView>, MovablePieceView<MultiSidedSpriteView<PieceComponent>>[]>()
    this.pieces.forEach(piece => {
      for (let container of this.containers) {
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
      if (c.category === container.content.containerComponent.category) {
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
    const map = shuffled.reduce((map, item, index) => {
      map.set(item.content.renderedObject, index)
      return map
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
    // shuffled.forEach((item, index) => item.setLocation({
    //   rotation: item.location.rotation,
    //   position: {
    //     ...item.location.position,
    //     z: index + container.location.position.z + 1
    //   }
    // }))
    // this.updateJSONView()
    // this.updateItemsAssignedToContainers()
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

  public destroy() {
    this.JSONView.destroy()
    this.showJSONViewField.destroy()
    this.saveButton.destroy()
    this.root.removeChild(this.board)
    this.root.removeChild(this.currentActorLabel)
    this.destroyBoard()
  }

  private destroyBoard() {
    if (this.background != null) {
      this.board.removeChild(this.background)
    }
    if (this.historyView != null) {
      this.root.removeChild(this.historyView.element)
      this.historyView.destroy()
    }
    // this.root.removeChild(this.board)
    this.pieces.forEach(element => element.destroy())
    this.containers.forEach(container => container.destroy())
    this.pieces = []
    this.containers = []
  }
}