import '../Image/Image.css'
import './Form.css'
import Common from '../Common/Common'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const BaseUrl = 'http://localhost:5000'
let i=0;

const Form = () => {

  // let arrayAns = useRef<any>([]);
  const param = useParams();
  console.log(param, "param");
  const formId =param.formid;

  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false)

  type ansType = {
    que: string,
    ans: any
  } 
  const [answer, setAnswer] = useState<ansType[]>([
    { que: '', ans: null}
  ]);
  
  type answerType = {
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    quef: string,
    ansf: string,
    // checkIndex : number
  }

  function handleAnswer({ e, index, quef, ansf}: answerType) {

    const _answer = [...answer];
    console.log("answer:",_answer[index])
    if(e.target.type === 'checkbox'){
      if(e.target.checked){
        if(!_answer[index]){
          _answer[index]= { que : quef , ans : [ansf]} 
        }
        else{
          _answer[index]= { que : quef , ans : [..._answer[index].ans, ansf]} 
        }
      }else{
        _answer[index]= {que : quef , ans : _answer[index].ans?.filter((single : any)=> single !== ansf)}
      }
    }

    else{
      _answer[index] = { que: quef, ans: ansf }
    }
    setAnswer([..._answer])
  }

  type questionType = {
    options: string[],
    question: string,
    type: string
  }

  type formType = {
    desc: string,
    title: string,
    type: string,
    _id: string,
    stage: string,
    questions: questionType[],
  }
  const [form, setForm] = useState<formType[]>([]);
  const [r, sR] = useState(0);
  useEffect(() => {
    (async function fetch(){
      try {
        const res = await axios.get(`${BaseUrl}/formData`);
        console.log('dataFrom api: ',res.data.data);
        if(Array.isArray(res?.data?.data)) {
        console.log("renderCount in effect", renderCount);

        setForm(res.data.data);

        }

        // sR(r => r+1);
      } catch (error) {
        console.log(error)
      }
    })()

  }, []);

  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;
  console.log("renderCount", renderCount.current);


  async function handleFormSubmit(title: string, formId: any) {
     
    setStatus(true);
    //status updated
    try {
      axios.put(`${BaseUrl}/updateForm/${formId}`,{status: "Answered"}).then(res => console.log("updatedRes: ",res))
    } catch (error) {
      console.log(error);
    }
      
    const postForm = {
      name,
      title,
      answer
    };
    console.log(postForm);

      try {
         const res = await axios.post(`${BaseUrl}/formAns`,postForm);
         if(res.status===200){
          toast.success('Response recorded successfully !!')
          console.log(res.data);
         }
      } catch (error) {
        console.log(error);
      }
  }
 
  
  console.log(form, "form");
console.log("formid", formId);
  return (
    <div className='image-video-container' data-testid='image-video-container'>
      <Common />
      <div className="noti">
        <p style={{ color: "green" }}>Please fill the form !!</p>
      </div>
      <div className='form-container' data-testid='form-container'>
        <input type="text" className='name' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} />
        {
          form?.map((ques: formType, i: number) => (
            formId === ques._id ? (
              <div key={i} >
                {ques.questions?.map((que: questionType, j: number) => (
                  <div className="form-ques" key={j}>
                    {j > 0 &&
                      <div className="que-array">
                        <div className="que">
                          <p>{j}. {que.question}</p>
                        </div>
                        <div className="options-radio-checkbox">
                          {que.type === 'checkbox' &&
                            <div className="options">
                              <div className='opt1'>
                                <input type='checkbox' id='opt1' data-testid={`checkbox-opt-${j}`} onChange={(e) => handleAnswer({ e, index: j-1, quef: que.question , ansf: que.options[0]})} />
                                <label htmlFor="opt1">{que.options[0]}</label>
                              </div>
                              <div className='opt2'>
                                <input type='checkbox' id='opt2' data-testid={`checkbox-opt-${j}`} onChange={(e) => handleAnswer({ e, index: j-1 , quef: que.question , ansf: que.options[1] })} />
                                <label htmlFor="opt2">{que.options[1]}</label>
                              </div>
                            </div>
                          }
                          {que.type === 'radio' &&
                            <div className="options">
                              <div className='opt1'>
                                <input type='radio' id='opt1' data-testid={`radio-opt-${j}`} name='radio' onChange={(e) => handleAnswer({ e, index: j - 1, quef: que.question, ansf: que.options[0] })} />
                                <label htmlFor="opt1">{que.options[0]}</label>
                              </div>
                              <div className='opt2'>
                                <input type='radio' id='opt2' data-testid={`radio-opt-${j}`} name='radio' onChange={(e) => handleAnswer({ e, index: j - 1, quef: que.question, ansf: que.options[1] })} />
                                <label htmlFor="opt2">{que.options[1]}</label>
                              </div>
                            </div>
                          }
                          {que.type === 'single' &&
                            <div className="input-ans">
                              <input data-testid='input-answer' type="text" placeholder='Add your answer' onChange={(e) => handleAnswer({ e, index: j - 1, quef: que.question, ansf: e.target.value })} />
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                ))}
                <div className="submit-form-btn">
                  <button data-testid='form-submit'  onClick={() => handleFormSubmit(ques?.title, formId)}>SUBMIT</button><br />
                  { status? <p style={{color: "Green", marginTop:'0.5rem',textAlign:'center'}}>Please wait...</p>:<p style={{color: "gray",marginTop:'0.5rem'}}>Please add your name</p>}
                </div>
              </div>
            ) : null
          )
          )
        }
      </div>

      
    </div>

  )
}

export default Form
