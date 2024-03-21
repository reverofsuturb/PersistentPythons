import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MainPage.css';
import { useModal } from '../../context/Modal';
import SignupFormModal from '../SignupFormModal';

import mainPhoto from '../../images/MainPage_oto.png'
import boardPhoto from '../../images/board.png'

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

                </div>
                <div style={{marginLeft:'10px'}}>
                    <p></p>
                    <img className='maingImageMainPage' src={mainPhoto} />
                    <p></p>
                </div>
            </div>

            {/* I need a center text on how the webpage works and have it centered on the page */}



            <div className='lowercontainerback'>
                <div className='lowercontainer'>
                    <div className='toppart'>
                            <h5 style={{marginBottom:'0px'}}>SPACE ODYSSEY 101</h5>
                            <h1 style={{marginTop:'10px', marginBottom:'15px'}}>A Productive Vaca</h1>
                            <h4 style={{marginTop:'0px'}}>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. Learn more in our guide for getting started.</h4>
                    </div>


                    <div className='lowerpart'>
                        <div className='leftside'>
                            <div>
                                <p>
                                    Boardings(Boards)
                                </p>
                                <h5>SO keeps the tasks and days nice with incredible views! In a glance to see the space intertwine with time, to make you go aw!</h5>
                            </div>
                            <div>
                                <p>
                                To-go!(list)
                                </p>
                                <h5>The diffent stages of time travel to go! Start as simple as seeing your childhood pet, seeing grandma, or not going out with that certain someone! Theres no wrong way of SO!</h5>

                            </div>
                            <div>
                                <p>
                                Credit Card!
                                </p>
                                <h5>"Time and space makes the heart grow fonder" no more. With one simple purchase you can easily have all the time you want, or less, with your SO, using SO!</h5>

                            </div>
                        </div>
                        <div style={{paddingBottom:'80px'}}>
                            <img className='boards' src={boardPhoto} />
                        </div>
                    </div>


                </div>

            </div>

            {!sessionUser && <button className='Joinusalready' type="button" onClick={signupModal}>Join Meetup</button>}
        </div>
    );
}
