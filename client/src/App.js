import React from 'react';
import 'materialize-css';
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'

function App() {
    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = !!token;
    const rotes = useRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
          <Router>
              { isAuthenticated && <Navbar />}
               <div className='container'>
                   {rotes}
               </div>
          </Router>
        </AuthContext.Provider>
    );
}

export default App;