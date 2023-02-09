import useAuth from "./hooks/useAuth"
import AuthenticationPage from "./pages/authentication/page"
import MainPage from "./pages/main/page"
import { ChatProvider } from "./providers/ChatProvider"

export default function App() {
  const { currentUser } = useAuth()
  return currentUser === undefined ? <AuthenticationPage /> : <ChatProvider><MainPage /></ChatProvider>
}