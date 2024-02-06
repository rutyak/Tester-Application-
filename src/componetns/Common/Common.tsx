import arrow from '../../Asset/left-arrow (1).png'
import { useNavigate } from 'react-router-dom'
import './Common.css'

const Common = () => {

  const navigate = useNavigate();

  return ( 
    <div data-testid="home-btn" className='home' onClick={()=>navigate('/')}><img src={arrow} alt="arrow-icon"/><p>Home</p></div>
  )
}

export default Common
