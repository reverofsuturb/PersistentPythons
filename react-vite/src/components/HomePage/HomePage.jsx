import "./HomePage.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";

export default function HomePage() {
  const isLoggedIn = useSelector((state) => state.session.user);

  return (
    <div className="containerforthehomepage">
      <div id="secondHalfContainer">
        <div id="spaceParagraphContainer">
          <div className="home-title">Space Odyssey</div>
          <h2 id="spaceParagraph">
            We unite your missions, crew, and resources in one cosmic hub. Keep
            your galactic endeavors organized, even across vast distances.
          </h2>
          <h3 id="secondSpaceParagraph">
            Keep everything in the same space-even if your crew wont.
          </h3>
          <div>
            <div className="JoinButton">
              {!isLoggedIn && (
                <OpenModalMenuItem
                  itemText={
                    <span id="signUpHereButton">Sign Up For Free!</span>
                  }
                  modalComponent={<SignupFormModal />}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
