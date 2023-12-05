
import './App.css';
import Home from './component/Home';
import Add from './component/Add';
import View from './component/View';
import Edit from './component/Edit';
import Footer from './component/Footer';
import Header from './component/Header';
import { Route, Routes } from 'react-router';
import Spinner from './component/Spinner';
import Pnf from './component/Pnf';


function App() {
  return (
    <div className="App">
       <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/add' element={<Add></Add>}/>
        <Route path='/edit/:id' element={<Edit></Edit>}/>
        <Route path='/view/:id' element={<View></View>}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
