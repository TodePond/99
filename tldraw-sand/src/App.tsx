import { StateNode, TLUiOverrides, Tldraw, toolbarItem } from "@tldraw/tldraw"
import '@tldraw/tldraw/tldraw.css'

class SandTool extends StateNode {

  static override id = 'sand'
  static override initial = 'idle'
  static override children = () => [SandIdle]

  override onEnter = () => {
    this.editor.setCursor({ type: 'cross', rotation: 0 })
  }

  override onExit = () => {
    this.editor.setCursor({ type: 'default', rotation: 0 })
  }
}

class SandIdle extends StateNode {

  static override id = 'idle'

}

const tools = [SandTool]

const overrides: TLUiOverrides = {
  tools: (editor, tools) => {
    return {
      ...tools,
      sand: {
        id: 'sand',
        label: 'Sand',
        readonlyOk: false,
        icon: 'color',
        kbd: 's',
        onSelect() {
          editor.setCurrentTool('sand')
        },
      },
    }
  },
  toolbar: (_editor, toolbarItems, { tools }) => {
    toolbarItems.splice(4, 0, toolbarItem(tools.sand))
    return toolbarItems
  },
}

function App() {

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
    }}>
      <Tldraw
        tools={tools}
        overrides={overrides}
      />
    </div >
  )
}

export default App
