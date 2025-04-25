import logoImg from '../../assets/main-logo.png'
import profile from '../../assets/profile.png'
import home from '../../assets/home.png'
import addImg from '../../assets/add-movie.png'
import './Navbar.css';
import {Link} from 'react-router-dom'
const Navbar=()=> {
    const token=localStorage.getItem('token')
    return (
        <>
        <div className='d-none d-sm-block shadow mb-3 p-2'>
            <div to="/home" className='d-flex justify-content-between text-decoration-none'>
            <div className='d-flex gap-1 align-items-center'>
                <img src={logoImg} alt="logo" width="44px"/>
                <Link to="/home" className='text-decoration-none fw-semibold'>YourNextMovie</Link>
            </div>
            <div className='pe-4'>
            <Link to="/add-movie" className='text-decoration-none'>
            <button className='btn fw-bold'>Add Movie</button>
            </Link>
            <Link to="/profile" className='text-decoration-none'><button className='btn fw-bold'>Profile</button></Link>
            </div>
            </div>
        </div>
        
        <div className='bottomNav d-flex justify-content-between d-sm-none fixed-bottom shadow rounded-2'>
            <Link to="/home" className='text-decoration-none'>
            <button className='btn'>
                <img src={home} alt="home" width="32px"/>
            </button>
            </Link>
            <Link to="/add-movie" className='text-decoration-none'>
            <button className='btn'>
                <img src={addImg} alt="home" width="32px"/>
            </button>
            </Link>
            <Link to="/profile" className='text-decoration-none'>
            <button className='btn'>
                <img src={profile} alt="home" width="32px"/>
            </button>
            </Link>
        </div>
        </>
    )
}
export default Navbar