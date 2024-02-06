import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Tester.css' 
import axios from 'axios'
const BaseUrl = 'http://localhost:5000'

const Tester = () => {
  
  type questionType ={
    options: string[],
    question: string,
    type: string
  }

  type formType={
    desc: string,
    title: string,
    type: string,
    _id: string,
    stage: string,
    questions: questionType
  }

  type videoType={
    desc: string,
    title: string,
    type: string,
    videoType: string,
    videoUrl: string,
    _id: string,
    stage: string,
  }

  type imageType={
    desc: string,
    title: string,
    type: string,
    imageFile: string[],
    _id: string,
    stage: string,
  }
  const [video, setVideo] = useState<videoType[]>();
  const [image, setImage] = useState<imageType[]>();
  const [form, setForm] = useState<formType[]>();

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetch() {
      try {
        const video = await axios.get(`${BaseUrl}/videoData`);
        setVideo(video.data.data);
        const res1 = await axios.get(`${BaseUrl}/imageData`);
        setImage(res1.data.data);
        const res2 = await axios.get(`${BaseUrl}/formData`);
        setForm(res2.data.data);
      } catch (error) {
          console.log(error)
      }
    })()
  }, [])


  
  return (
    <div className='tester-container'>
      <div className="title">
        <h3>Survey</h3>
      </div>
      <div className="survey-container" data-testid='survey-container'>
        {
          video?.map((video: videoType, i: number)=>(
            video.stage === 'published'? (
              <div className="survey-block" data-testid={`survey-block-video-${i}`} onClick={()=>navigate(`/video/${video._id}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background:"#d4b0b0"}}>{video.type}</p>
                </div>
                <p>Title: {video.title}</p>
                <p>Description: {video.desc}</p>
              </div>
            </div>
            ): ''
          ))
        }
        {
          image?.map((image: imageType, i: number)=>(
            image.stage === 'published'? (
              <div className="survey-block" data-testid={`survey-block-image-${i}`} onClick={()=>navigate(`/image/${image._id}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background: "#e55b5b"}}>{image.type}</p>
                </div>
                <p>Title: {image.title}</p>
                <p>Description: {image.desc}</p>
              </div>
            </div>
            ): ''
          ))
        }
        {
          form?.map((form: formType, i: number)=>(
            form.stage === 'published'? (
              <div className="survey-block" data-testid={`survey-block-form-${i}`} onClick={()=>navigate(`/form/${form._id}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background:"#755fb7"}}>{form.type}</p>
                </div>
                <p>Title: {form.title}</p>
                <p>Description: {form.desc}</p>
              </div>
            </div>
            ): ''
          ))
        }
      </div>
    </div>
  )
}

export default Tester
