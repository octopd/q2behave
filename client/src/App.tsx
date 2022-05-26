import Layout from './components/Layout/Layout'
import ContextProvider from './providers/ContextProvider'
import './scss/App.scss'

function App() {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  )
}

export default App
