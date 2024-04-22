import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <div id="teamContainer">
      <h2 id="meet">Find Us</h2>
      <div id="nameContainer">
        <div className="namesContainer">
          <h3 className="name">Sam</h3>
          {/* <Link to="https://www.linkedin.com/in/ ">Linkedin</Link> */}
          <Link to="https://github.com/reverofsuturb">
            <FaGithub />
          </Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Stryker</h3>
          {/* <Link to="https://www.linkedin.com/in/ ">Linkedin</Link> */}
          <Link to="https://github.com/MooseyStryker">
            {" "}
            <FaGithub />
          </Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Ava</h3>
          {/* <Link to="https://www.linkedin.com/in/ ">Linkedin</Link> */}
          <Link to="https://github.com/Aluxee">
            {" "}
            <FaGithub />
          </Link>
        </div>
        <div className="namesContainer">
          <h3 className="name">Veronica</h3>
          {/* <Link to="https://www.linkedin.com/in/veronica-moss">Linkedin</Link> */}
          <Link to="https://github.com/vmoss1">
            {" "}
            <FaGithub />
          </Link>
        </div>
      </div>
    </div>
  );
}
