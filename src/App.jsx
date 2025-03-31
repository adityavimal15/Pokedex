import { useState, useEffect } from 'react';
import './App.css';
import CustomRoutes from './routes/CustomRoutes';
import Entry from './Components/Entry/entry';

function App() {
  const [showEntry, setShowEntry] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntry(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='app-wrapper'>
      {showEntry ? <Entry /> : (
        <>
          <h1>POKEDEX</h1>
          <CustomRoutes />
        </>
      )}
    </div>
  );
}

export default App;