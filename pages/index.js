import Head from "next/head";
import { Inter } from "next/font/google";
import {Row, Col, Container, Image} from 'react-bootstrap';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Container>
      <Row>
      <Col md={6}><Image fluid rounded src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"  /></Col>
        <Col md={6}>
          <h2>Metropolitan Museum of Art</h2>
          <p>
            The Metropolitan Museum of Art, colloquially "The Met," is located
            in New York City and is the largest art museum in the United
            States. It was founded in 1870 and has a vast collection of art
            spanning over 5,000 years from different cultures around the world.
          </p>
          <p>
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Learn more on Wikipedia
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
