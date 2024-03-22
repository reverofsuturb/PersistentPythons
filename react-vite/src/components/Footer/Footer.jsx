import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div id="teamContainer">
      <h2 id="meet">Meet The Team</h2>
      <div id="nameContainer">
        <div className="namesContainer">
          <h3 className="name">Sam FieldMan</h3>
          <Link to="https://www.linkedin.com/in/ ">Linkedin</Link>
          <Link to="https://github.com/reverofsuturb">GitHub</Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Stryker</h3>
          <Link to="https://www.linkedin.com/in/ ">Linkedin</Link>
          <Link to="https://github.com/MooseyStryker">GitHub</Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Ava Luxe</h3>
          <Link to="https://www.linkedin.com/in/ ">Linkedin</Link>
          <Link to="https://github.com/Aluxee">GitHub</Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Veronica Moss</h3>
          <Link to="https://www.linkedin.com/in/veronica-moss">Linkedin</Link>
          <Link to="https://github.com/vmoss1">GitHub</Link>
        </div>
      </div>
    </div>
  );
}
