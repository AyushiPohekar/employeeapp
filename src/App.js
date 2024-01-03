
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Table from './Components/Table';
import Form from './Components/Form';
import AddEmployee from './Components/AddEmployee';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Table/>}/>
      <Route path="/edit/:id" element={<Form/>}/>
      <Route path="/add" element={<AddEmployee/>}/>

      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
