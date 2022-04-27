import { Button, Card, Col, Image, Row } from "react-bootstrap";
import BMWImage from "../../assets/BMW.jpg";
import "./Contact.scss";
function Contact() {
  return (
    <>
      <div className="container">
        <h3 data-testid="contactus">Contact Us</h3>
        <Card>
          <Row>
            <Col>
              <Card.Body>
                <Card.Title className="contact--title">CALL US</Card.Title>
                <Card.Text className="contact--text">
                  <a href="tel:18002003000" className="formatLink">
                    1800&nbsp;200&nbsp;3000 (Mon to Sat 9:30 AM to 6 PM)
                  </a>
                </Card.Text>
              </Card.Body>
            </Col>
            <Col>
              <Card.Body>
                <Card.Title className="contact--title">E-MAIL</Card.Title>
                <Card.Text className="contact--text">
                  <a href="mailto:support@xtremecars.com" className="formatLink">
                    support@xtremecars.com
                  </a>
                </Card.Text>
              </Card.Body>
            </Col>
            <Row>
              <Col>
                <Image src={BMWImage} fluid alt="Car"></Image>
              </Col>
            </Row>
          </Row>
        </Card>
      </div>
    </>
  );
}
export default Contact;