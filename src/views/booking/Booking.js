import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Contact from "views/landing-page/Contact";
import withRouter from "components/WithRouterWrapper";
import insertBooking from "data/database/FirestoreDataSource";
import TableBook from "components/TableBook";
import sendNotifWABooking from "data/remote/AxiosDatasource";

const bookingSample = {
  bride: "test",
  groom: "test",
  service: "wedding",
  package: "Single",
  eventDate: '2024-12-12',
  startTime: '12:00',
  endTime: '16:00',
  email:'email@gmail.com',
  phoneWA:'08139943832',
  eventAddress: 'Karanganyar',
  brideInstagram: 'testbride',
  groomInstagram: 'testgroom',
  vendorInstagram: 'testgroom',
  price: 'Rp.1000.000',
  minimalDp: 'Rp.200.000'
}

function randomID(){
  return Math.random().toString(36).split('').filter(function (value, index, self) {
    return self.indexOf(value) === index;
  }).join('').substring(2, 9).toUpperCase();
}

export async function submitBooking(bookingData) {

  bookingData['bookingId']= randomID()
  insertBooking(bookingData)

  const messageNotif = {
    whatsappTo: '6281329729429',
    whatsappTemplate: 'booking_detail',
    bookingId: bookingData.bookingId,
    service: bookingData.service,
    package: bookingData.package,
    eventDate:bookingData.eventDate,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
    bride: bookingData.bride,
    groom: bookingData.groom,
    eventAddress: bookingData.eventAddress,
    email: bookingData.email,
    phoneWA: bookingData.phoneWA,
    brideInstagram: bookingData.brideInstagram,
    groomInstagram: bookingData.groomInstagram,
    vendorInstagram: bookingData.vendorInstagram,
    price: bookingData.price,
    minimalDp: bookingData.minimalDp
  }
  console.log('send notif...')
  await sendNotifWABooking(messageNotif)
}
class Booking extends React.Component {


  async componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    console.log(this.props)


  }

  render() {
    // const { packageItem } = this.state;
    const packageItem = this.props.router.location.state.package;
    console.log(this.stateData)
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1"></div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="8">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="bg-white px-lg-5 py-lg-5">
                      <TableBook
                        // image={this.state.image}
                        serviceName={packageItem[0]}
                        packageItem={packageItem[1].title}
                        serviceList={packageItem[1].items}
                        price={packageItem[1].price}
                        minDp={packageItem[1]["minimal-dp"]}
                      ></TableBook>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-camera" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select" name="select" id="exampleSelect">
                              <option>Choose Package</option>
                              <option>Package Sangar</option>
                              <option>Package Elok</option>
                              <option>Package Wahhhhhh</option>
                            </Input>
                          </InputGroup>
                        </FormGroup>
                        <Row>
                          <Col md="6">
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fa fa-venus" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Bride" type="text" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fa fa-mars" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Groom"
                                  type="text"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>

                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-map-marker" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Address" type="text" />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-camera" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Event Type"
                              type="text"
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-calendar" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Date" type="date" />
                          </InputGroup>
                        </FormGroup>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fa fa-clock-o" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Start time"
                                  type="time"
                                />
                              </InputGroup>
                              <div className="text-muted">
                                <small>*Event Start time & End time</small>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fa fa-clock-o" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="End time" type="time" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fa fa-instagram" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Bride's Instagram"
                                  type="text"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fa fa-instagram" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Groom's Instagram" type="text" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Note"
                              type="textarea"
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={async () => await submitBooking(bookingSample)}

                          >
                            Book Now
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <Contact />
      </>
    );
  }
}

export default withRouter(Booking);
