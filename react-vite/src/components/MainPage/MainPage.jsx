import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MainPage.css';
import { useModal } from '../../context/Modal';
import SignupFormModal from '../SignupFormModal';

import mainPhoto from '../../images/MainPage_oto.png'

export default function MainPage() {
    const sessionUser = useSelector((state) => state.session.user);
    const { setModalContent } = useModal();

    const navigate = useNavigate()

    const allGroups = () => {
        navigate(`/groups`)
    }
    const allEvents = () => {
        navigate(`/events`)
    }
    const createGroup = () => {
        if (!sessionUser){
            setModalContent(<NotLoggedInModal />);
        } else {
            navigate(`/groups/new`);
        }
    }
    const signupModal = () => {
        setModalContent(<SignupFormModal />)
    }

    return (
        <div className="main-page">
            <div className='tagContainer'>
                <div className='tag_bar'>
                    <h4>Accelerate your teams travel plans with Trans-galactic Artificial Intelligence Facilitating Orbital Organic Distance (TAI FOOD)</h4>
                </div>
            </div>

            <div className='welcome'>
                <div className='welcomeText'>
                    <h1 className='fixtxtalign' >Space Odyssey brings the joy of travel, with the greatness of planning!</h1>
                    <p id='ptagchagne'>A space odyssey with a date, probably!</p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div>
                    <p></p>
                    <img className='maingImageMainPage' src={mainPhoto} />
                    <p></p>
                </div>
            </div>

            {/* I need a center text on how the webpage works and have it centered on the page */}



            <div>
                <div>
                    <span>SPACE ODYSSEY 101</span>
                    <span>A Productive Vaca</span>
                    <span>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. Learn more in our guide for getting started.</span>
                </div>

                <div>

                </div>

            </div>

            {!sessionUser && <button className='Joinusalready' type="button" onClick={signupModal}>Join Meetup</button>}
        </div>
    );
}
