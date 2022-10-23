import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "./App.css";
import background1 from "../assets/nft2.jpeg";
import background2 from "../assets/nft1.gif";
import background3 from "../assets/nft3.jpeg";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";
import image6 from "../assets/6.png";
import logo1 from "../assets/logo (1).png";
import logo2 from "../assets/logo (2).png";
import logo3 from "../assets/logo (3).png";
import logo4 from "../assets/logo (4).png";
import logo5 from "../assets/logo (5).png";

const Inicio = ({ marketplace, nft }) => {
  return (
    <div>
      <div class="nav-header nav-header-inicio">
        <h1>BBVA MASK</h1>
        <h3 class="span loader">
          <span class="m">9</span>
          <span class="m">0</span>
          <span class="m"> </span>
          <span class="m">A</span>
          <span class="m">Ñ</span>
          <span class="m">O</span>
          <span class="m">S</span>
          <span class="m"> </span>
          <span class="m">C</span>
          <span class="m">O</span>
          <span class="m">N</span>
          <span class="m">T</span>
          <span class="m">I</span>
          <span class="m">G</span>
          <span class="m">O</span>
        </h3>
        <br />
        <Nav>
          <Nav.Link href={`#market`} className="nav-menu  nav-menu-cuenta">
            DESCUBRIR COLECCIÓN
          </Nav.Link>
        </Nav>
      </div>
      <br />
      <br />
      <br />

      <div id="market">
        <h1 className="titulo-inicio"> NFTS COLECCIONABLES</h1>
        <hr className="titulo-inicio" />
        <div class="container-list">
          <div class="card card-1">
            <div class="card-header  button-met button-met-silver">
              <p> DÉCADA 1930</p>
            </div>
            <div class="card-body">
              <div>
                <img src={background1} height="250" className="" alt="" />
              </div>
              <Nav>
                <Nav.Link href={`/marketplace`} className="button-card">
                  ADQUIRIR
                </Nav.Link>
              </Nav>
            </div>
          </div>
          <div class="card card-2">
            <div class="card-header  button-met button-met-gold">
              <p>DÉCADA 1990</p>
            </div>
            <div class="card-body">
              <div>
                <img src={background2} height="250" className="" alt="" />
              </div>

              <Nav>
                <Nav.Link href={`/marketplace`} className="button-card">
                  ADQUIRIR
                </Nav.Link>
              </Nav>
            </div>
          </div>
          <div class="card card-3">
            <div class="card-header button-met button-met-yellowgold">
              <p>DÉCADA 2010</p>
            </div>
            <div class="card-body">
              <div>
                <img src={background3} height="250" className="" alt="" />
              </div>

              <Nav>
                <Nav.Link href={`/marketplace`} className="button-card">
                  ADQUIRIR
                </Nav.Link>
              </Nav>
            </div>
          </div>
        </div>
        <br />
        <br /> <br />
      </div>

      <div className="beneficios">
        <br />

        <h3 className="titulo-aliados">EXPERIENCIAS DE VIDA</h3>
        <div class="row">
          <div class="col col--1of6">
            <img src={image1} height="150" className="" alt="" />
            BECA DE ESTUDIOS
          </div>
          <div class="col col--1of6">
            <img src={image2} height="150" className="" alt="" />
            DISPOSITIVOS
          </div>
          <div class="col col--1of6">
            <img src={image3} height="150" className="" alt="" />
            BICICLETAS
          </div>
          <div class="col col--1of6">
            <img src={image4} height="150" className="" alt="" />
            VIAJES
          </div>
          <div class="col col--1of6">
            <img src={image5} height="150" className="" alt="" />
            EVENTOS DEPORTIVOS
          </div>
          <div class="col col--1of6">
            <img src={image6} height="150" className="" alt="" />
            CASA
          </div>
        </div>
        <br />
        <h5 className="titulo-aliados">
          Consulta y participa en nuestro programa de recompensas BBVA MASK, con
          el que podrás ganar grandes premios
        </h5>
        <br />
      </div>

      <div class="wrap fondo-blanco">
      
        <h3 className="titulo-aliados"> NUESTROS ALIADOS</h3>
        <div class="slider-c">
          <div class="slide-track">
            <div class="slide">
              <img src={logo1} height="100" width="100" alt="" />
            </div>
            <div class="slide">
              <img src={logo2} height="100" width="250" alt="" />
            </div>
            <div class="slide">
              <img src={logo3} height="100" width="250" alt="" />
            </div>
            <div class="slide">
              <img src={logo4} height="100" width="250" alt="" />
            </div>
            <div class="slide">
              <img src={logo5} height="100" width="250" alt="" />
            </div>

            <div class="slide">
              <img src={logo1} height="100" width="100" alt="" />
            </div>
            <div class="slide">
              <img src={logo2} height="100" width="250" alt="" />
            </div>
            <div class="slide">
              <img src={logo3} height="100" width="250" alt="" />
            </div>
            <div class="slide">
              <img src={logo4} height="100" width="250" alt="" />
            </div>
            <div class="slide">
              <img src={logo5} height="100" width="250" alt="" />
            </div>

            <div class="slide">
              <img src={logo1} height="100" width="100" alt="" />
            </div>
            <div class="slide">
              <img src={logo2} height="100" width="250" alt="" />
            </div>

 
          </div>
        </div>
        <br />
        <br />
        <Nav>
              <Nav.Link href={`#market`} className="button-card">
                BENEFICIOS
              </Nav.Link>
            </Nav>
            <br />
        <br />
      </div>
  

      <div class="nav-header nav-header-video">
        <h1>CÓNOCE TODOS LOS BENEFICIOS DE BLOCKCHAIN</h1>

        <br />
        <Nav>
          <Nav.Link href={`#market`} className="button-card">
            DESCUBRIR
          </Nav.Link>
        </Nav>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Inicio;
