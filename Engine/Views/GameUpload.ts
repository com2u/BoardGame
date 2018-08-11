import { View } from './View'
import { ContainerView } from './Container'
import { LabelView } from './Label'
import { ButtonView } from './Button'
import { FileInputView } from './FileInput'
import { InputField } from './InputField'
import { GameDefinition } from './Game'
import { parseGameJSON } from '../Services/ParseGameJSON'
import { InputView } from './Input'
import { GameAddResponse } from '../Services/GameStorage'

const imageExtensions = [
  '.png',
  '.jpg',
  '.gif',
].join()

export class GameUploadView implements View {
  constructor(
    private onGameSubmit: (name: string, game: GameDefinition) => GameAddResponse
  ) {
    this.handleFormUpdate()
  }

  private handleFormUpdate = () => {
    const form = this.container.content.form.content
    const name = form.name.input.content.input.value
    const boardImage = form.boardImage.input.value
    const componentsSpriteSheet = form.componentsSpriteSheet.input.value
    const gameConfig = form.gameConfig.input.value

    if (boardImage != null && componentsSpriteSheet != null && gameConfig != null && name != null) {
      Promise
        .all([
          fileToDataURL(boardImage),
          fileToDataURL(componentsSpriteSheet),
          fileToText(gameConfig)
        ])
        .then(([boardImageURL, componentsSpriteSheetURL, config]) => {
          this.gameDefinition = {
            boardImageURL,
            componentsSpriteSheetURL,
            config: parseGameJSON(config)
          }
          this.container.content.form.content.footer.content.submit.element.disabled = false
        })
        .catch(() => {
          this.gameDefinition = null
          this.container.content.form.content.footer.content.submit.element.disabled = true
        })
    } else {
      this.container.content.form.content.footer.content.submit.element.disabled = true
    }
  }

  private gameDefinition: GameDefinition | null = null

  private handleSubmit = () => {
    const form = this.container.content.form.content
    const name = form.name.input.content.input.value
    if (this.gameDefinition != null && name != null) {
      const response = this.onGameSubmit(name, this.gameDefinition)
      if (response.status === 'error') {
        form.footer.content.errors.text = response.errors.join('\n')
      } else {
        form.footer.content.errors.text = ''
      }
    }
  }

  private container = new ContainerView(
    {
      header: new LabelView('Upload game files', 'game-upload-view__header'),
      form: new ContainerView(
        {
          name: new InputField(
            'Name',
            new ContainerView(
              {
                input: new InputView(
                  this.handleFormUpdate
                )
              }
            )
          ),
          boardImage:
            new InputField(
              'boardImage',
              new FileInputView(
                this.handleFormUpdate,
                imageExtensions
              )
            ),
          componentsSpriteSheet:
            new InputField(
              'componentsSpriteSheet',
              new FileInputView(
                this.handleFormUpdate,
                imageExtensions
              )
            ),
          gameConfig:
            new InputField(
              'gameConfig',
              new FileInputView(
                this.handleFormUpdate,
                '.json'
              )
            ),
          footer: new ContainerView({
            errors: new LabelView('', 'game-upload-view__errors'),
            submit: new ButtonView(
              'submit',
              this.handleSubmit
            )
          }, 'game-upload-view__footer')
        },
        'game-upload-view__form'
      )
    },
    'game-upload-view'
  )

  public get element() {
    return this.container.element
  }

  public destroy() {

  }
}

function fileToDataURL(file: File) {
  const reader = new FileReader()
  return new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as any)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function fileToText(file: File) {
  const reader = new FileReader()
  return new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as any)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
