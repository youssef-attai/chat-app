import ChatPage from "./chat/page"
import useMainPage from "./hook"
import MainPageProvider from "./provider"
import SettingsPage from "./settings/page"

function Page() {
    const { currentPage } = useMainPage()
    return currentPage === 'chat' ? <ChatPage /> : <SettingsPage />
}

export default function MainPage() {
    return <MainPageProvider><Page /></MainPageProvider>
}