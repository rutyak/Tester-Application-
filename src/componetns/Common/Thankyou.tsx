import './Thankyou.css'
import thank from '../../Asset/360_F_505390776_8ilykzGiVSpIjUqdEXFhDY1ACRJZPDRD.jpg'
import Common from './Common'
function Thankyou() {
  return (
    <div className='Thankyou'>
      <Common/>
      <div className='thanks-contain'>
        <img className='thanks-img' src={thank} alt="thanks" />
      </div>
      
    </div>
  )
}

export default Thankyou
