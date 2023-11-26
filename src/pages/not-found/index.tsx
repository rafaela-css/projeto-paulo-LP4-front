import { Container, Nav, Navbar } from "react-bootstrap";
import fotoRobo from '../../assets/BlogGraphic_4_404.png'
import { ContainerImagem, ImagemRobo } from "./styles";

export default function NotFound() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="home">Central de Tarefas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="home">Início</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ContainerImagem>
        <ImagemRobo src={fotoRobo} alt="" />
      </ContainerImagem>
    </>
  );
}
