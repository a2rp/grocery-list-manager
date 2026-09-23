import About from './components/about'
import GroceryListManager from './components/groceryListManager'
import Header from './components/header'
import ScrollToTopButton from './components/scrollToTopButton'
import Footer from './components/footer'

const App = () => {
    return (
        <>
            <Header />
            <GroceryListManager />
            <About />
            <ScrollToTopButton />
            <Footer />
        </>
    )
}

export default App
