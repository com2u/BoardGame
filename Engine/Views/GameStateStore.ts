import { BoardComponent } from './Game'
import { Readable, Variable } from '../../reaction-framework/observable-variable';
import { ObservableArray, ReadonlyObservableArray } from '../../reaction-framework/observable-array';
import { MovablePieceLocation } from './MovablePiece';

export type GameState = BoardComponent[]

export type UpdateType =
  'move_piece' |
  'flip_piece' |
  'shuffle_pieces' |
  'move_pieces_to_container' |
  'changed_in_json_editor'

export interface GameStateHistoryItem {
  action: string,
  time: Date,
  state: GameState
}

export class GameStateContainer {
  constructor (
    private initialState: GameState
  ) {
    
  }

  private _history = new ObservableArray<GameStateHistoryItem>([])

  public history = this._history as ReadonlyObservableArray<GameStateHistoryItem>

  private currentState = new Variable<GameState>(this.initialState)

  public state = this.currentState as Readable<GameState>

  public addState(state: GameState, action: UpdateType) {
    this._history.add({
      action,
      time: new Date(),
      state
    })
    console.log('setting state')
    this.currentState.set(state)
    console.log('state set')
  }

  public unwindHistory() {
    const snapshot = this._history.pop()
    if (snapshot == null) {
      throw new Error('History is empty')
    } else {
      const lastHistoryItem = this._history.items[this._history.items.length - 1]
      const newState = (lastHistoryItem && lastHistoryItem.state) || this.initialState
      this.currentState.set(newState)
      return snapshot
    }
  }

  public movePiece(piece: BoardComponent, newLocation: MovablePieceLocation) {
    this.addState(
      this.state.get()
        .map(
          c => c === piece
            ? { ...piece, location: newLocation }
            : c
        ),
      'move_piece'
    )
  }
}