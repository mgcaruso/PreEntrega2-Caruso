import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer';
import { Routes, Route, } from 'react-router-dom'
import Home from './pages/Index/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import ItemDetailContainer from './pages/ItemDetailContainer/ItemDetailContainer';
import { ThemeContext } from './components/Context/Theme/theme';
import { useContext, useEffect } from 'react';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound/NotFound';

function App() {


  const { theme, setTheme } = useContext(ThemeContext);
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark').matches;

  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add('dark');
      setTheme("dark");
    }
  }

  useEffect(() => {
    themeCheck();
  }, [theme])

  return (


    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/products' element={<ItemListContainer />} />
        <Route exact path='/category/:categoryId' element={<ItemListContainer />} />
        <Route exact path='/item/:id' element={<ItemDetailContainer />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
