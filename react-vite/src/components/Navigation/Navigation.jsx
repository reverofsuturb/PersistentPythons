import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalMenuItem from "./OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";
import PostBoard from "../Boards/PostBoard";
import { GiSpaceSuit } from "react-icons/gi";

function Navigation() {
  const isLoggedIn = useSelector((state) => state.session.user !== null);

  return (
    <div id="navBar">
      <div id="homeBoardLinkContainer">
        <NavLink id="homeNavLink" to="/">
          <GiSpaceSuit />
          Space Odyssey
        </NavLink>
        {isLoggedIn && (
          <div id="boardLinksContainer">
            <button id="allBoardsButton">
              <NavLink id="allBoardsButton" to="/boards">
                All Boards
              </NavLink>
            </button>
            <OpenModalMenuItem
              itemText={<span id="createNewButton">Create</span>}
              modalComponent={<PostBoard />}
            />
          </div>
        )}
      </div>
      <div id="modalButtonsContainer">
        {isLoggedIn && <ProfileButton />}
        {!isLoggedIn && (
          <div id="loginAndSignupButtonContainer">
            <OpenModalMenuItem
              itemText={<span id="missionControlButton">Mission Control</span>}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText={<span id="joinButton">Join Space Odyssey</span>}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
