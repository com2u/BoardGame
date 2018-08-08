import { Vector3, add } from '../vector-3';
import { View } from './View';

export interface MovablePieceLocation {
  position: Vector3,
  rotation: number
}

export class MovablePieceView<Content extends View> {
  constructor (
    private root: HTMLElement,
    public readonly name: string,
    public location: MovablePieceLocation,
    private _content: Content,
    private onLocationInput: (newLocation: MovablePieceLocation) => void,
    private bringToTop: (sprite: MovablePieceView<Content>) => void,
    private zIndex = 0
  ) {
    this.element = document.createElement('div')
    this.element.classList.add('movable-piece-view')
    this.element.appendChild(this._content.element)
    root.appendChild(this.element)

    this.rotationHandle = document.createElement('div')
    this.rotationHandle.classList.add('movable-piece-view__rotation-handle')
    this.rotationHandle.style.display = 'none'
    this.element.appendChild(this.rotationHandle)
    
    this.element.addEventListener('pointerdown', this.onElementPointerDown)
    this.rotationHandle.addEventListener('pointerdown', this.onRotationHandlePointerDown)
    document.addEventListener('pointerdown', this.onDocumentPointerDown)
    document.addEventListener('pointermove', this.onDocumentPointerMove)
    document.addEventListener('pointerup', this.onDocumentPointerUp)

    this.updateElementLocation(location)
  }

  public get content() {
    return this._content
  }

  private element: HTMLElement

  private rotationHandle: HTMLDivElement

  private _showRotationHandle = false

  private get showRotationHandle() {
    return this._showRotationHandle
  }

  private set showRotationHandle(value: boolean) {
    this.rotationHandle.style.display = value ? 'block' : 'none'
    this._showRotationHandle = value
    this.updateZIndex()
  }

  private rotationInProgress = false

  private rotationStartElementLocation: { x: number, y: number } | null = null

  private rotationStartEventLocation: { x: number, y: number } | null = null

  private _draggingInProgress = false
  private set draggingInProgress(value: boolean) {
    this._draggingInProgress = value
    if (value) {
      this.showRotationHandle = value
    }
  }
  private get draggingInProgress() {
    return this._draggingInProgress
  }

  private dragStartEventLocation: { x: number, y: number } | null = null

  private onElementPointerDown = (event: PointerEvent) => {
    this.draggingInProgress = true
    this.dragStartEventLocation = {
      x: event.pageX,
      y: event.pageY
    }
  }

  private updateZIndex() {
    this.element.style.zIndex = this.showRotationHandle ? '10' : this.zIndex.toString();
  }

  private onRotationHandlePointerDown = (event: PointerEvent) => {
    event.stopPropagation();
    const rect = this.element.getBoundingClientRect()
    this.rotationStartEventLocation = {
      x: event.pageX,
      y: event.pageY
    }
    this.rotationStartElementLocation = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
    this.rotationInProgress = true;
  }

  private onDocumentPointerMove = (event: PointerEvent) => {
    const updatedRotation = this.getUpdatedRotation(event)
    if (updatedRotation != null) {
      this.updateElementLocation({
        rotation: updatedRotation,
        position: this.location.position
      })
      return
    }

    if (this.dragStartEventLocation == null || !this.draggingInProgress) {
      return
    }

    this.updateElementLocation({
      rotation: this.location.rotation,
      position: {
        x: this.location.position.x + event.pageX - this.dragStartEventLocation.x,
        y: this.location.position.y + event.pageY - this.dragStartEventLocation.y,
        z: this.location.position.z
      }
    })
  }

  private getUpdatedRotation(event: PointerEvent) {
    if (this.rotationInProgress && this.rotationStartElementLocation != null && this.rotationStartEventLocation != null) {
      const offset = {
        x: event.pageX - this.rotationStartElementLocation.x,
        y: event.pageY - this.rotationStartElementLocation.y,
      }
      const vectorToStartEventPosition = {
        x: this.rotationStartEventLocation.x - this.rotationStartElementLocation.x,
        y: this.rotationStartEventLocation.y - this.rotationStartElementLocation.y,
      }
      const vectorToNewEventPosition = {
        x: event.pageX - this.rotationStartElementLocation.x,
        y: event.pageY - this.rotationStartElementLocation.y,
      }
      const a = vectorToStartEventPosition
      const b = vectorToNewEventPosition
      const angle = Math.atan2(b.y,b.x) - Math.atan2(a.y,a.x)
      return this.location.rotation + Math.round(angle * 180 / Math.PI)
    }
  }

  private onDocumentPointerDown = (event: PointerEvent) => {
    if (event.target != this.element) {
      this.showRotationHandle = false
    }
  }

  private onDocumentPointerUp = (event: PointerEvent) => {
    if (this.rotationInProgress) {
      const updatedRotation = this.getUpdatedRotation(event)
      if (updatedRotation != null) {
        this.onLocationInput({
          rotation: updatedRotation,
          position: this.location.position
        })
      }
      this.rotationInProgress = false;
    }

    if (this.dragStartEventLocation == null || !this.draggingInProgress) {
      return
    }

    this.showRotationHandle = true;

    this.onLocationInput({
      rotation: this.location.rotation,
      position: add(
        this.location.position,
        {
          x: event.pageX - this.dragStartEventLocation.x,
          y: event.pageY - this.dragStartEventLocation.y,
          z: 0
        }
      )
    })

    this.dragStartEventLocation = null
    this.draggingInProgress = false
  }

  public setLocation(location: MovablePieceLocation) {
    this.location = location;
    this.updateElementLocation(location);
  }

  private updateElementLocation(location: MovablePieceLocation) {
    const p = location.position
    this.element.style.transform = `translate3d(${p.x - Math.round(this.element.clientWidth / 2)}px, ${p.y - Math.round(this.element.clientHeight / 2)}px, ${p.z}px) rotateZ(${location.rotation}deg)`;
  }

  public destroy() {
    this.element.removeChild(this._content.element)
    this._content.destroy()
    this.element.removeEventListener('pointerdown', this.onElementPointerDown)
    document.removeEventListener('pointermove', this.onDocumentPointerMove)
    document.removeEventListener('pointerup', this.onDocumentPointerUp)
    this.root.removeChild(this.element)
  }
}