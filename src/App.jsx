import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ItemDetail from './pages/ItemDetail';
import { CategoryProvider } from './context/categoryContext';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import AddItem from './pages/AddItem';
import { Toaster } from 'react-hot-toast';
import AddSubCategory from './pages/addSubCategory';
import AddEvent from './pages/AddEvent';

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
                  path='/category/:categoryType/:itemName'
                  element={<ItemDetail />}
                />
                <Route path='/category/events' element={<Events />} />
                <Route path='/category/events/:event' element={<EventDetails />} />
                <Route path='/addItem' element={<AddItem />} />
                <Route path='/addEvent' element={<AddEvent />} />
                <Route path='/addSubCategory' element={<AddSubCategory />} />
              </Routes>
            </BrowserRouter>
            <Toaster
              position='top-right'
              gutter={12}
              containerStyle={{ margin: '8px' }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 3000,
                },
                style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: 'var(--color-grey-0)',
                  color: 'var(--color-grey-700)',
                },
              }}
            />
        </CategoryProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
