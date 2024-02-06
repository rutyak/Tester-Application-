import Tester from './componetns/Tester';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './componetns/Form/Form'
import Video from './componetns/Video/Video';
import Image from './componetns/Image/Image';
import './App.css';
import Thankyou from './componetns/Common/Thankyou';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Tester/>}/>
            <Route path='/video/:videoid' element={<Video/>}/>
            <Route path='/image/:imageid' element={<Image/>}/>
            <Route path='/form/:formid' element={<Form/>}/>
            <Route path='/thanks' element={<Thankyou/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
