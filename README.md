# Demo Chat App

I implemented basic a navigation mechanism using React Contexts.

I didn't use [React Router](https://reactrouter.com/en/main) because I find it confusing, even though their docs are great, probably one of the best docs out there.

Anyway, here is my navigation solution:

1. Create the components/pages like you normally would:

###### FirstPage.tsx

```
function FirstPage() {
    return <div>First Page</div>
}
```

###### SecondPage.tsx

```
function SecondPage() {
    return <div>Second Page</div>
}
```

2. Create a wrapper component/page that will conditionally render `FirstPage` or `SecondPage` based on `currentPage` a state variable:

###### PagesContainer.tsx

```
function PagesContainer() {
    const [ currentPage, setCurrentPage ] = useState<'first' | 'second'>('first')
    return currentPage === 'first' ? <FirstPage /> : <SecondPage />
}
```

3. Create a context for the pages container and extract the `useState` into the context's provider:


###### PagesContainerContext.ts

```
type pages = 'first' | 'second'

interface PagesContainerContextValue {
    currentPage: pages
    navigate: React.Dispatch<React.SetStateAction<pages>>
}

const PagesContainerContext = createContext({} as PagesContainerContextValue)
```

###### usePagesContainer.ts

```
function usePagesContainer() {
    return useContext(PagesContainerContext)
}
```

###### PagesContainerProvider.tsx

```
function PagesContainerProvider({ children }: PropsWithChildren) {
    const [ currentPage, setCurrentPage ] = useState<pages>('first')

    const contextValue: PagesContainerContextValue = { currentPage, navigate: setCurrentPage }

       return (
        <PagesContainerContext.Provider value={contextValue}>
            {children}
        </PagesContainerContext.Provider>
    )
}
``` 

4. Now wrap your pages container in the provider to be able to use the hook inside `FirstPage` and `SecondPage`:


###### PagesContainer.tsx

```
function Page() {
    const { currentPage } = usePagesContainer()
    return currentPage === 'first' ? <FirstPage /> : <SecondPage />
}

function PagesContainer() {
    return <PagesContainerProvider><Page /></PagesContainerProvider>
}
```

You can now use `usePagesContainer` from `FirstPage` and `SecondPage`:

```
function FirstPage() {
    const { navigate } = usePagesContainer()
    return <>
        <div>First Page</div>
        <button onClick={() => {
            navigate('second')
        }}>
            go to second page
        </button>
    </>
}
```

If you feel confused or don't understand anything, please try looking the [pages](./frontend/src/pages/) directory, you will find the following:

- The whole app is divided into two pages: the authentication page, and the main page.

- The authentication page is like the pages container, it wraps the pages related to authentication, the login page and the sign up page.

- The main page is another pages container, it wraps the chat page and the settings page.

- Each of the two pages container (authentication and main) have their own context, context provider, and hook to be able use the context from inside the provider.

If you are still confused try cloning the repo and mess around.