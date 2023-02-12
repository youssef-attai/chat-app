import ChatPage from "./chat/page"
import CreateRoomPage from "./createRoom/page"
import FriendRequestPage from "./friendRequest/page"
import useMainPage from "./hook"
import MainPageProvider from "./provider"
import SettingsPage from "./settings/page"

function Page() {
    const { currentPage } = useMainPage()
    let page;
    switch (currentPage) {
        case "chat": {
            page = <ChatPage />;
            break;
        }
        case "settings": {
            page = <SettingsPage />
            break;
        }
        case "createRoom": {
            page = <CreateRoomPage />
            break;
        }
        case "friendRequest": {
            page = <FriendRequestPage />
            break;
        }
    }
    return page;
}

export default function MainPage() {
    return <MainPageProvider><Page /></MainPageProvider>
}