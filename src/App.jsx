import About from './components/about'
import GroceryListManager from './components/groceryListManager'
import ScrollToTopButton from './components/scrollToTopButton'

const App = () => {
    return (
        <>
            <GroceryListManager />
            <About />
            <ScrollToTopButton />
        </>
    )
}

export default App