import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';

function Footer() {
  return (
    <Navbar
      data-bs-theme="primary"
      fixed="bottom"
      data-testid="footer"
    >
      <Container>
        <Nav className="me-auto nav-bar-footer justify-content-around">
          <Navbar.Brand
            href="/drinks"
          >
            <img
              src="src/images/drinkIcon.svg"
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
              src="src/images/mealIcon.svg"
              data-testid="meals-bottom-btn"
              width="30"
              height="30"
              alt="Ícone de comidas"
            />
          </Navbar.Brand>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Footer;
