import { JSONLoader } from '../json-loader'
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
    private loader: JSONLoader,
    private gameId: string,
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
        this.destroyBoard()
        this.gameState = newConfig
        this.createBoard(newConfig)
      }
    )

    this.saveButton = new ButtonView(
      this.root,
      'Save',
      () => downloadJsonFile(`${this.gameId}.json`, JSON.stringify(this.gameState, null, 2))
    )

    this
      .loader
      .loadJSON<any>(`Games/${this.gameId}/components.json`)
      .then(result => {
        let gameConfig: GameConfig
        if (result.version == null) {
          gameConfig = updateGameStateFromV1ToV2(updateGameStateFromV0ToV1(result as GameConfigV0))
        } else if (result.version === '1') {
          gameConfig = updateGameStateFromV1ToV2(result as GameConfigV1)
        } else if (result.version === '2') {
          gameConfig = result
        } else {
          throw new Error('Unsupported game config loaded')
        }

        this.gameState = gameConfig
        this.JSONView.setValue(gameConfig)
        this.createBoard(gameConfig)
      })
  }

  private pieces: MovablePieceView<MultiSidedSpriteView<PieceComponent>>[] = []

  private containers: MovablePieceView<PieceContainerView>[] = []

  private board: HTMLDivElement

  private background: HTMLImageElement | null = null

  private currentActorLabel: HTMLDivElement

  private showJSONViewField: CheckBoxField

  private saveButton: ButtonView

  private JSONView: JSONView<GameConfig>

  private gameState: GameConfig | null = null

  private createBoard(config: GameConfig) {
    const componentsSpriteSheet = `Games/${this.gameId}/components.png`

    this.background = document.createElement('img')
    this.background.src = `Games/${this.gameId}/board.png`
    this.background.setAttribute('draggable', 'false')
    this.board.appendChild(this.background)

    const sprites =
      config
        .components
        .filter(component => component.type == 'piece')
        .map((c, index) => {
          const component = c as PieceComponent
          const sprite = new MultiSidedSpriteView(
            this.board,
            component,
            config.sprites,
            componentsSpriteSheet,
            component.sides,
            component.currentSide,
            () => {
              const newSide = (component.currentSide + 1) % component.sides.length
              component.currentSide = newSide
              this.updateJSONView()
              sprite.currentSide = newSide
            }
          )
          const piece = new MovablePieceView(
            this.board,
            `[${index}] ${component.name}`,
            component.location,
            sprite,
            newLocation => {
              component.location = newLocation
              this.updateJSONView()
              piece.setLocation(newLocation)
              this.updateItemsAssignedToContainers()
            },
            piece => {
              this.currentActorLabel.innerHTML = `Current component - ${piece.name}`
              this.bringToTop(piece)
            },
            1
          )

          return piece
        })
    
    const pieceContainers =
        config
          .components
          .filter(c => c.type === 'container')
          .map(c => {
            const container = c as PieceContainerComponent
            const sprite = new SpriteView(
              null,
              componentsSpriteSheet,
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
                container.location = newLocation
                this.updateJSONView()
                piece.setLocation(newLocation)
                this.updateItemsAssignedToContainers()
              },
              () => {}
            )

            return piece
          })
    
    this.containers.push(...pieceContainers)
    this.pieces.push(...sprites)
  }

  private updateJSONView() {
    if (this.gameState != null) {
      this.JSONView.setValue(this.gameState)
    }
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
    if (this.gameState == null) {
      throw new Error('Game state is not initialized')
    }
    const containerSprite = this.gameState.sprites[container.backgroundSprite]
    const position = piece.location.position

    return (
      position.x >= (container.location.position.x - containerSprite.width / 2) &&
      position.x <= (container.location.position.x + containerSprite.width / 2) &&
      position.y >= (container.location.position.y - containerSprite.height / 2) &&
      position.y <= (container.location.position.y + containerSprite.height / 2)
    )
  }

  private resetPieces(container: MovablePieceView<PieceContainerView>) {
    this.pieces.forEach(piece => {
      if (piece.content.renderedObject.category === container.content.containerComponent.category) {
        const newLocation: MovablePieceLocation = {
          rotation: container.location.rotation,
          position: {
            ...container.location.position,
            z: Math.max(piece.content.renderedObject.location.position.z, container.location.position.z + 1)
          }
        }
        piece.content.renderedObject.location = newLocation
        piece.setLocation(newLocation)
      }
    })
    this.updateItemsAssignedToContainers()
    this.updateJSONView()
  }

  private shufflePieces(container: MovablePieceView<PieceContainerView>) {
    const items = this.containerToPieceMap.get(container)
    if (items == null) {
      throw new Error('Items were not assigned to the container')
    }
    shuffle(items).forEach((item, index) => item.setLocation({
      rotation: item.location.rotation,
      position: {
        ...item.location.position,
        z: index + container.location.position.z + 1
      }
    }))
    this.updateJSONView()
    this.updateItemsAssignedToContainers()
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
    // this.root.removeChild(this.board)
    this.pieces.forEach(element => element.destroy())
    this.containers.forEach(container => container.destroy())
    this.pieces = []
    this.containers = []
  }
}