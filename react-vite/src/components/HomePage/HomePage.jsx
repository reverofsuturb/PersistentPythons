import "./HomePage.css";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from "react-redux";

export default function HomePage() {
  const isLoggedIn = useSelector((state) => state.session.user);
  return (
    <div>
      <div id="accelerateContainer">
        <h3 id="accelerate">
          Accelerate your teams work with Atlassian Intelligence (AI) features
          🤖 now in beta! Learn more.
        </h3>
      </div>
      <div id="spaceParagraphContainer">
        <h2 id="spaceParagraph">
          Space Odyssey unites your missions, crew, and resources in one cosmic
          hub. Keep your galactic endeavors organized, even across vast
          distances.
        </h2>
        <h3 id="secondSpaceParagraph">
          Keep everything in the same space-even if your crew wont.
        </h3>
        <div>
          <div className="JoinButton">
            {!isLoggedIn && (
              <OpenModalButton
                buttonText="Sign up - it's free!"
                modalComponent={<SignupFormModal />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
