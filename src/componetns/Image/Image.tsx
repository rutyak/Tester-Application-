import './Image.css'
import Common from '../Common/Common'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const BaseUrl = 'http://localhost:5000'

const Image = () => {

  const param = useParams();
  const imageId = param.imageid;
  console.log('imageId: ', imageId);

  const navigate = useNavigate();
  const [name, setName] = useState<String>('');
  const [status, setStatus] = useState<boolean>(false);

  type imgType = {
    img1: string,
    img2: string
  }
  const [ans, setAns] = useState<imgType>({
    img1: '',
    img2: ''
  })

  function handleImg(url: string) {


    console.log("Image clicked")
    setAns({
      ...ans,
      img1: ans.img1 === '' ? url : ans.img1,
      img2: ans.img1 !== '' ? url : ans.img2
    })

  }


  type imageType = {
    desc: string,
    title: string,
    type: string,
    imageFile: string[],
    _id: string,
    stage: string,
    answer: string[]
  }
  const [image, setImage] = useState<imageType[]>();

  useEffect(() => {
    (async function fetch() {
      try {
        const res = await axios.get(`${BaseUrl}/imageData`);
        setImage(res.data.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  console.log("ImageData: ", image);
  console.log("Answer: ", ans);

  async function handleImgSubmit(title: string, imageId: string) {

    setStatus(true);
    //status updated
    try {
      axios.put(`${BaseUrl}/updateImage/${imageId}`, { status: "Answered" }).then(res => console.log("updatedRes: ", res))
    } catch (error) {
      console.log(error);
    }
    const postImage = {
      name,
      title,
      answer: ans
    };
    console.log(postImage);

    try {
      const res = await axios.post(`${BaseUrl}/imageAns`, postImage);
      if (res.status === 200) {
        toast.success('Response recorded successfully !!')
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='image-video-container' data-testid='image-container'>
      <Common />
      <div className="noti">
        <h2>Please select any two images !!</h2>
      </div>
      <input type="text" placeholder='Enter your name' className='iName' onChange={(e) => setName(e.target.value)} />
      {
        image?.map((img: imageType, i: number) => {
          if (imageId === img._id) {
            return <div className='image-container' key={i} data-testid='images'>

              <div className='img-section'>
                <div className='img-flex'>
                  {img.imageFile?.map((img: string, i: number) => (
                    <div className='images'>
                      <img src={img} data-testid="image-tag" alt="img" className={ans.img1 === img || ans.img2 === img ? 'select' : ''} onClick={() => handleImg(img)} />
                    </div>
                  ))
                  }
                </div>
                <div className='btn-images'>
                  <button className='img-submit' data-testid='image-submit' onClick={() => handleImgSubmit(img.title, imageId)}>Submit</button>
                  {status ? <p style={{ color: "green", marginTop: '0.5rem', textAlign: 'center' }}>Please wait...</p> : <p style={{ color: "Gray", marginTop: '0.5rem' }}>Please add your name</p>}
                </div>
              </div>
            </div>
          }
        })
      }
    </div>
  )
}

export default Image
