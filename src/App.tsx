import Tester from './componetns/Tester';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './componetns/Form/Form'
import Video from './componetns/Video/Video';
import Image from './componetns/Image/Image';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Tester/>}/>
            <Route path='/video/:videoId' element={<Video/>}/>
            <Route path='/image/:imageId' element={<Image/>}/>
            <Route path='/form/:formId' element={<Form/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
