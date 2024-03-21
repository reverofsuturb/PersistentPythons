import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";

function Navigation() {
  const isLoggedIn = useSelector((state) => state.session.user !== null);
  return (
    <div id="navBar">
      <div>
        <NavLink id="homenavlink" to="/">
          Space Odyssey
        </NavLink>
      </div>
      {/* <div>
          <NavLink to="/boards">All Boards</NavLink>
        </div>
        <div>
          <NavLink to="/boards/new">New Board</NavLink>
        </div> */}
      <div id="modalButtonsContainer">
        {isLoggedIn && <ProfileButton />}
        {!isLoggedIn && (
          <>
            <OpenModalButton
              buttonText="Access Control Panel"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Join Space Odyssey"
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
