import { useAuthenticationPage } from "../hook"

function SignUpPage() {
    const { navigate } = useAuthenticationPage()
    return (
        <>
            <h1>Sign up</h1>
            <button onClick={() => { navigate('login') }}>go to login page</button>
        </>
    )
}

export default SignUpPage