import React from 'react';
import 'materialize-css';
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'

function App() {
    const {token, ready, login, logout, userId} = useAuth();
    const isAuthenticated = !!token;
    const rotes = useRoutes(isAuthenticated);

    if (!ready){
        return <Loader />
    }
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
