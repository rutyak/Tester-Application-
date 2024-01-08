import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Tester.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { clearSurvey, videoSurvey } from '../Redux/videoSlice'
import { clearImageSurvey, imageSurvey } from '../Redux/imageSlice'
import { clearFormSurvey, formSurvey } from '../Redux/formSlice'
import { useSelector } from 'react-redux'


const Tester = () => {
  
  // const {video, form, image} = useSelector((state: any)=>{
  //   return {
  //     video : state.video.videoInfo[0],
  //     form: state.form.formInfo[0],
  //     image : state.image.imageInfo[0]
  //   }
  // })

  const [video, setVideo] = useState<any>();
  const [image, setImage] = useState<any>();
  const [form, setForm] = useState<any>();

  const navigate = useNavigate();

  useEffect( ()=>{
     axios.get('http://localhost:5000/videoData').then(response => setVideo(response.data.data))
     axios.get('http://localhost:5000/imageData').then((response)=> setImage(response.data.data))
     axios.get('http://localhost:5000/formData').then((response) => setForm(response.data.data))
  },[])

  console.log("vInfo",video);
  console.log("iInfo",image);
  console.log("fInfo",form);

  
  return (
    <div className='tester-container'>
      <div className="title">
        <h3>Survey</h3>
      </div>
      <div className="survey-container">
        {
          video?.map((ele: any, i: number)=>(
            <div className="survey-block" onClick={()=>navigate(`/video/${ele.title}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background:"#d4b0b0"}}>{ele.type}</p>
                </div>
                <p>Title: {ele.title}</p>
                <p>Description: {ele.desc}</p>
              </div>
            </div>
          ))
        }
        {
          image?.map((ele: any, i: number)=>(
            <div className="survey-block" onClick={()=>navigate(`/image/${ele.title}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background: "#e55b5b"}}>{ele.type}</p>
                </div>
                <p>Title: {ele.title}</p>
                <p>Description: {ele.desc}</p>
              </div>
            </div>
          ))
        }
        {
          form?.map((ele: any, i: number)=>(
            <div className="survey-block" onClick={()=>navigate(`/form/${ele.title}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background:"#755fb7"}}>{ele.type}</p>
                </div>
                <p>Title: {ele.title}</p>
                <p>Description: {ele.desc}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Tester
