import { Outlet } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className="flex">
       <Sidebar/>
       <Outlet/>
    </div>
  );
}

export default App;
