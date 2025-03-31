// App.js
import React, { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import PGHome from './pages/PGHome';
import PGPiechart from './pages/PGPiechart'
import PGStockDetails from './pages/PGStockDetails';
import MyDataTable from './components/Testing/MyDataTable';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) that takes some time
    const fetchData = async () => {
      // Your asynchronous code here

      // For demo purposes, let's simulate a delay with setTimeout
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <SplashScreen />
      ) : (
        // Render your main application content here
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PGHome/>}/>
              <Route path="/piechart" element={<PGPiechart/>}/>
              <Route path="/stock/:stockIndex" element={<PGStockDetails/>}/>
              <Route path="/cobacoba" element={<MyDataTable/>}/>
            </Routes>
          </BrowserRouter>
          {/* Other components and content */}
        </div>
      )}
    </div>
  );
};

export default App;
