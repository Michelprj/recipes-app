import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css';

function Footer() {
  return (
    <nav
      data-testid="footer"
      className="container-nav-bar"
    >
      <div className="container-links">
        <Nav className="me-auto nav-bar-footer justify-content-around">
          <Navbar.Brand
            href="/drinks"
          >
            <img
              src="/iconDrink.svg"
              data-testid="drinks-bottom-btn"
              width="30"
              height="30"
              alt="Ícone de bebidas"
            />
          </Navbar.Brand>
          <Navbar.Brand
            href="/meals"
          >
            <img
              src="/iconMeals.svg"
              data-testid="meals-bottom-btn"
              width="35"
              height="35"
              alt="Ícone de comidas"
            />
          </Navbar.Brand>
        </Nav>
      </div>
    </nav>
  );
}
export default Footer;
