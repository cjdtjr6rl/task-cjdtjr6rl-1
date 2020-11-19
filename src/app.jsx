import React from 'react';
import UserContext from './components/usercontext/usercontext';
import { UserProvider } from './users';

function App() {
    return (
        <UserProvider>
            <UserContext />
        </UserProvider>
    );
}

export default App;