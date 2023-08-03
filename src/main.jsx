import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './components/Context/Theme/theme.jsx';
import FiltersProvider from './components/Context/Filters/filters.jsx';

{/* <React.StrictMode> */ }
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FiltersProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </FiltersProvider>
  </BrowserRouter>

  ,
)
// </React.StrictMode>
