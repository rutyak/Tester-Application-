import '../Image/Image.css'
import './Video.css'
import Common from '../Common/Common'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const BaseUrl = 'http://localhost:5000'

const Video = () => {

  const param = useParams();
  const videoId = param.videoId;
  const id = param.id;
  const navigate = useNavigate();
  const [name, setName] = useState<String>('');

  type videoType = {
    desc: string,
    title: string,
    type: string,
    videoType: string,
    videoUrl: string,
    _id: string,
    stage: string,
  }
  const [video, setVideo] = useState<videoType[]>();
  const [videoDuration, setVideoDuration] = useState<number>(0);

  type ansType = {
    start: string,
    end: string,
  }
  const [ans, setAns] = useState<ansType>({
    start: '',
    end: ''
  });

  useEffect(() => {
    (async function fetch(){
      try {
        const res = await axios.get(`${BaseUrl}/videoData`);
        setVideo(res.data.data)
      } catch (error) {
        console.log(error)
      }
    })()

  }, [])


  function handleMetadataLoad(e: React.SyntheticEvent<HTMLVideoElement>) {

    const duration = (e.currentTarget as HTMLVideoElement).duration;
    setVideoDuration(duration);
  }
  console.log("Duration", videoDuration)
  console.log("ANs: ", ans)


  async function handleVideoSubmit(title: string, videoUrl: string, videoType: string) {

    //status updated
    axios.put(`${BaseUrl}/updateVideo/${id}`,{status: "Answered"}).then(res => console.log("updatedRes: ",res))

    const postVideo = {
      name,
      title,
      answer: ans,
      videoUrl,
      videoType
    };
    console.log(postVideo);

    try {
      const res = await axios.post(`${BaseUrl}/videoAns`, postVideo);
      if (res.status === 200) {
        toast.success('Response recorded successfully !!')
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log('VideoApi: ',video);

  return (
    <div className='image-video-container'>
      <div>
        <Common />
        <div className="noti">
          <h2>Please cut the important part of video !!</h2>
        </div>
      </div>
      <input type="text" placeholder='Enter your name' className='vName' onChange={(e) => setName(e.target.value)} />
      {
        video?.map((video: videoType, i: number) => {
          if (videoId === video.title) {
            return <div data-testid='video-container' className='video-container' key={i}>

              <div className="video-section">
                <div className='video-part'>
                  <video data-testid='video-tag' width="380px" height="220px" controls onLoadedMetadata={handleMetadataLoad}>
                    <source src={video.videoUrl} type={`video/${video.videoType}`} />
                  </video>
                </div>
                <div className='input-part'>
                  <div className='p-tag'>
                    <p>Start Time(seconds):</p>
                  </div>
                  <div className='input'>
                    <input type="text"
                      placeholder="Seconds"
                      onChange={(e) => setAns({
                        ...ans,
                        start: e.target.value
                      })}
                    />
                  </div>
                </div>
                <div className='input-part'>
                  <div className='p-tag'>
                    <p>End Time(seconds):</p>
                  </div>
                  <div className='input'>
                    <input type="text"
                      placeholder="Seconds"
                      onChange={(e) => setAns({
                        ...ans,
                        end: e.target.value
                      })}
                    />
                  </div>
                </div>
                <div className='submit-video-btn'>
                  <div className='submit-btn'>
                    <button onClick={() => handleVideoSubmit(videoId, video.videoUrl, video.videoType)}>Submit</button>
                    <p style={{color: "Green"}}>Please add your name</p>
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
