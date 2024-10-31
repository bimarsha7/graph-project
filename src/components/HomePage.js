import BasicNavBar from "./Navbar";
import { Graph } from "./Graph";
import { Container } from "react-bootstrap";

export const HomePage = () => {
  return (
    <>
      <BasicNavBar />
      <Container fluid="lg">
        <Graph />
      </Container>
    </>
  )
};
