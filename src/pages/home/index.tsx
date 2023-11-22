import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Task from "../../components/task";
import LoadingButton from "../../components/button";
import { Content, Tasks } from "./styles"

export default function Home() {
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
      <div>
        <Content>          
          <h2>Tarefas</h2>
          <LoadingButton />
        </Content>
        <Tasks>
          <Task />
        </Tasks>
      </div>
    </>
  );
}
