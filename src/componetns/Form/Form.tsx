import '../Image/Image.css'
import './Form.css'
import Common from '../Common/Common'

const form = () => {
  return (
    <div className='image-video-container'>
      <Common/>
      <div className="noti">
        <p style={{color: "green"}}>Please fill the form !!</p>    
      </div>
      <div className='form-container'>
         <div className="radio-que">
             <div className="que">
                <p>1. How is the first prime minister of India?</p>
             </div>
             <div className="options">
                <div className='opt1'>
                  <input type='radio'/>
                  <label htmlFor="opt1">Dr. Rajedra Prasad</label>
                </div>
                <div className='opt2'>
                  <input type='radio'/>
                  <label htmlFor="opt2">Jawaharlal Neharu</label>
                </div>
             </div>
         </div>
         <div className="checkbox-que">
             <div className="que">
                <p>2. How is the first prime minister of India?</p>
             </div>
             <div className="options">
                <div className='opt1'>
                  <input type='checkbox'/>
                  <label htmlFor="opt1">Dr. Rajedra Prasad</label>
                </div>
                <div className='opt2'>
                  <input type='checkbox'/>
                  <label htmlFor="opt2">Jawaharlal Neharu</label>
                </div>
             </div>
         </div>
         <div className="input-que">
             <div className="que">
                <p>3. How is the first prime minister of India?</p>
             </div>
             <div className="input-ans">
              <input type="text" placeholder='Answer'/>
             </div>
         </div>
      </div>
      <div className="submit-form-btn">
        <button>SUBMIT</button>
      </div>
      
    </div>
  )
}

export default form
