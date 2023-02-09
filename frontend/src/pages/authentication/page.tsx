import LoginPage from "./login/page";
import SignUpPage from "./signup/page";
import { useAuthenticationPage } from "./hook";
import AuthenticationPageProvider from "./provider";

function Page() {
    const { currentPage } = useAuthenticationPage()
    return currentPage == "login" ? <LoginPage /> : <SignUpPage />
}

export default function AuthenticationPage() {
    return <AuthenticationPageProvider><Page /></AuthenticationPageProvider>
}