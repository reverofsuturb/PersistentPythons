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
            <div id="createButtonContainer">
              <OpenModalMenuItem
                itemText={<p id="createNewButton">Create</p>}
                modalComponent={<PostBoard />}
              />
            </div>
          </div>
        )}
      </div>
      <div id="modalButtonsContainer">
        {isLoggedIn && <ProfileButton />}
        {!isLoggedIn && (
          <div id="loginAndSignupButtonContainer">
            <OpenModalMenuItem
              itemText={<p id="missionControlButton">Login Mission Control</p>}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText={<p id="joinButton">Join Space Odyssey</p>}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
