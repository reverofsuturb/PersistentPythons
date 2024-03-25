import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div id="teamContainer">
      <h2 id="meet">Meet The Team</h2>
      <div id="nameContainer">
        <div className="namesContainer">
          <h3 className="name">Sam F.</h3>
          {/* <Link to="https://www.linkedin.com/in/ ">Linkedin</Link> */}
          <Link to="https://github.com/reverofsuturb">GitHub</Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Stryker H.</h3>
          {/* <Link to="https://www.linkedin.com/in/ ">Linkedin</Link> */}
          <Link to="https://github.com/MooseyStryker">GitHub</Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Ava L.</h3>
          {/* <Link to="https://www.linkedin.com/in/ ">Linkedin</Link> */}
          <Link to="https://github.com/Aluxee">GitHub</Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Veronica M.</h3>
          {/* <Link to="https://www.linkedin.com/in/veronica-moss">Linkedin</Link> */}
          <Link to="https://github.com/vmoss1">GitHub</Link>
        </div>
      </div>
    </div>
  );
}
