import { createRoot } from 'react-dom/client'
import App from "./App"
import DataProvider from './containers/DataProvider'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
  <DataProvider>
    <App />
  </DataProvider>
)
