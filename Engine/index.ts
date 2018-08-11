import { loadJSON, Loader } from './json-loader'
import { MainView } from './Views/Main'

const loader = new Loader(
  window.location.href.substring(0, window.location.href.lastIndexOf('/'))
)

const root = document.getElementById('root');
if (root == null) {
  throw new Error('Required elements are nor found')
}
const game = new MainView(loader)
root.appendChild(game.element)
game.mounted()
