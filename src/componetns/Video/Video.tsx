import '../Image/Image.css'
import './Video.css'
import Common from '../Common/Common'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Video = () => {

  const param = useParams();
  const id = param.videoId;
  console.log("Video id: ", id);

  const [video, setVideo] = useState<any>();

  // const video = useSelector((state: any) => state.video.videoInfo[0]);
  
  useEffect(()=>{
    axios.get('http://localhost:5000/videoData').then(response => setVideo(response.data.data))
  },[])

  console.log("videoData", video)
  console.log("videoUrl", video.url)
  console.log("videoType",video.videoType)

  return (
    <div className='image-video-container'>
      {
        video?.map((ele: any, i: number) => {
          if (id === ele.title) {
            return <div className='video-container' key={i}>
              <Common />
              <div className="noti">
                <h2>Please cut the important part of video !!</h2>
              </div>
              <div className="video-section">
                <div className='video-part'>
                  <video width="380px" height="220px" controls>
                    <source src={`http://localhost:8080/${ele.url}`} type={`video/${ele.videoType}`} />
                  </video>
                </div>
                <div className='input-part'>
                  <div className='p-tag'>
                    <p>Start Time(seconds):</p>
                  </div>
                  <div className='input'>
                    <input type="text" placeholder="Seconds" />
                  </div>
                </div>
                <div className='input-part'>
                  <div className='p-tag'>
                    <p>End Time(seconds):</p>
                  </div>
                  <div className='input'>
                    <input type="text" placeholder="Seconds" />
                  </div>
                </div>
                <div className='submit-video-btn'>
                  <div className='submit-btn'>
                    <button>Submit</button>
                  </div>

                </div>
              </div>
              </div>
          }
       

        })
      }
    </div>
  )
}

export default Video
