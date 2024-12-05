import React, { useContext } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router';
import { Header } from './components';
import { Home, Register, SignIn, Stories } from './pages';
import { Theme } from '@radix-ui/themes';
import { DarkModeContext } from './contexts/DarkModeContext';


function App() {

  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <Theme appearance={darkMode ? "dark" : "light"} accentColor="indigo" grayColor="sand" >
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/stories' element={<Stories />} />
            <Route path='/stories/:id' element={<Stories />} />

            <Route path='/*' element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      </Theme>
    </>
  );
}

export default App;
