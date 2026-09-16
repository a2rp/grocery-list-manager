import About from './components/about'
import GroceryListManager from './components/groceryListManager'
import ScrollToTopButton from './components/scrollToTopButton'
import Footer from './components/footer'

const App = () => {
    return (
        <>
            <GroceryListManager />
            <About />
            <ScrollToTopButton />
            <Footer />
        </>
    )
}

export default App
