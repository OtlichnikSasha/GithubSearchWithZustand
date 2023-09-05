import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/404' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  );
}

export default App;
