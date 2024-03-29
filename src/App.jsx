import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ItemDetail from './pages/ItemDetail';
import { CategoryProvider } from './context/categoryContext';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CategoryProvider>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route
                path='/category/:categoryType'
                element={<CategoryPage />}
              />
              <Route
                path='/category/:categoryType/:item'
                element={<ItemDetail />}
              />
              <Route
                path='/events'
                element={<Events />}
              />
              <Route
                path='/events/:event'
                element={<EventDetails />}
              />
            </Routes>
          </BrowserRouter>
        </CategoryProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
