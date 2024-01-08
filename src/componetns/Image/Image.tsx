import './Image.css'
import img1 from '../../Asset/add-image.png'
import img2 from '../../Asset/icons8-plus-64.png'
import img3 from '../../Asset/customer-survey-outline-icon-vector-manager-paperwork-team-graphic-design-logo-web-site-social-media-mobile-app-ui-183379636.jpg'
import img4 from '../../Asset/plus.png'
import Common from '../Common/Common'
import { useSelector } from 'react-redux'

const Image = () => {

  const images = useSelector((state: any)=>state.image.imageInfo[0]);
  console.log("image",images)
  
  return (
    <div className='image-video-container'>
      <Common/>
      <div className="noti">
        <h2>Please select any two images !!</h2>    
      </div>
      <div className='img-section'>
        <div>
          <img src={img1} alt="img" />
          <img src={img2} alt="img" />
          <img src={img3} alt="img" />
          <img src={img4} alt="img" />
        </div>
        <div>
          <button className='img-submit'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Image
