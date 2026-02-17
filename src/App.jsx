import React from 'react';
import RootNavigation from './routes/RootNavigation';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster position='top-right' reverseOrder={false}/>
      <RootNavigation />
    </div>
  );
};

export default App;
