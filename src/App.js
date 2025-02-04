
import './App.css';
import ResponsiveAppBar from './components/Navbar';
import SearchWithBackground from './components/SearchWithBackground';

import LatestTransactions from './components/LastestTrans';
import BscDashboard from './components/Statscard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
       <ResponsiveAppBar/>
       <SearchWithBackground/>
        <BscDashboard/>
       <LatestTransactions/>
       <Footer/>
    </div>
  );
}

export default App;
