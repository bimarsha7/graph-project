import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BasicNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Graph Plot</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default BasicNavBar;
