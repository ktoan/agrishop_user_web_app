import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaPrint,
  FaHome,
  FaEnvelope,
} from "react-icons/fa";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-section text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block text-white">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="/#" className="me-4 text-decoration-none text-white">
            <FaFacebook />
          </a>
          <a href="/#" className="me-4 text-decoration-none text-white">
            <FaTwitter />
          </a>
          <a href="/#" className="me-4 text-decoration-none text-white">
            <FaGoogle />
          </a>
          <a href="/#" className="me-4 text-decoration-none text-white">
            <FaInstagram />
          </a>
          <a href="/#" className="me-4 text-decoration-none text-white">
            <FaLinkedin />
          </a>
          <a href="/#" className="me-4 text-decoration-none text-white">
            <FaGithub />
          </a>
        </div>
      </section>
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold text-white mb-4">AgriShop</h6>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold text-white mb-4">Products</h6>
              <p className="text-white">Angular</p>
              <p className="text-white">React</p>
              <p className="text-white">Vue</p>
              <p className="text-white">Laravel</p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold text-white mb-4">Useful links</h6>
              <p className="text-white">Pricing</p>
              <p className="text-white">Settings</p>
              <p className="text-white">Orders</p>
              <p className="text-white">Help</p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold text-white mb-4">Contact</h6>
              <p className="text-white">
                <FaHome /> 480 Tran Dai Nghia
              </p>
              <p className="text-white">
                <FaEnvelope /> nktoanwork@gmail.com
              </p>
              <p className="text-white">
                <FaPhone /> +84 868 319 857
              </p>
              <p className="text-white">
                <FaPrint /> +01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center text-white p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
        © 2023 Copyright:{" "}
        <Link className="text-decoration-none text-white fw-bold" to="/home">
          AgriShop
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
