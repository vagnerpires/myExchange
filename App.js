import AppNavigation from './src/routes/stackRoutes';

import { userContext, userContextProps } from './src/context/userContext';
import { useState } from 'react';

export default function App() {

  const [userID, setUserID] = useState()

  return (
    <userContextProps.Provider value={[userID, setUserID]}>
      <userContext.Provider value={userID}>
        <AppNavigation />
      </userContext.Provider>
    </userContextProps.Provider>
  );
}