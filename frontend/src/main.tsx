import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
