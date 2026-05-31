import React from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
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
import ConfirmationSubmit from "./ConfirmationSubmit";

const WHATSAPP_API_URL = process.env.REACT_APP_WHATSAPP_API_URL || "http://localhost:4000/api/send-booking";

const bookingSample = {
  bride: "test",
  groom: "test",
  service: "wedding",
  package: "Single",
  eventDate: '2024-12-12',
  startTime: '12:00',
  endTime: '16:00',
  email: 'email@gmail.com',
  phoneWA: '08139943832',
  eventAddress: 'Karanganyar',
  brideInstagram: 'testbride',
  groomInstagram: 'testgroom',
  vendorInstagram: 'testgroom',
  price: 'Rp.1000.000',
  minimalDp: 'Rp.200.000'
}

function randomID() {
  return Math.random().toString(36).split('').filter(function (value, index, self) {
    return self.indexOf(value) === index;
  }).join('').substring(2, 9).toUpperCase();
}

export async function submitBooking(bookingData) {
  bookingData['bookingId'] = randomID();
  insertBooking(bookingData);

  const payload = {
    ...bookingData,
    packageTitle: bookingData.package,
    price: bookingData.price,
    minimalDp: bookingData.minimalDp,
  };

  console.log('send notif via WhatsApp server...');
  await axios.post(WHATSAPP_API_URL, payload);
}

class Booking extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      brideValid: true,
      groomValid: true,
      addressValid: true,
      dateValid: true,
      startValid: true,
      endValid: true,
      emailValid: true,
      waValid: true,
      brideValue: '',
      groomValue: '',
      addressValue: '',
      dateValue: '',
      startValue: '',
      endValue: '',
      emailValue: '',
      waValue: '',
      igBrideValue: '',
      igGroomValue: '',
      igVendorValue: '',
      noteValue: '',
      validateSubmit: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.brideValuehandleChange = this.brideValuehandleChange.bind(this);
    // this.groomValuehandleChange = this.groomValuehandleChange.bind(this);
    // this.addressValuehandleChange = this.addressValuehandleChange.bind(this);
    // this.dateValuehandleChange = this.dateValuehandleChange.bind(this);
    // this.startValuehandleChange = this.startValuehandleChange.bind(this);
    // this.endValuehandleChange = this.endValuehandleChange.bind(this);
    // this.emailValuehandleChange = this.emailValuehandleChange.bind(this);
    // this.waValuehandleChange = this.waValuehandleChange.bind(this);
    // this.igBridehandleChange = this.igBridehandleChange.bind(this);
    // this.igVendorhandleChange = this.igVendorhandleChange.bind(this);
    // this.notehandleChange = this.notehandleChange.bind(this);
  }

  async componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    // check = Object.values(this.state).every(value => value == true || typeof value === 'string')

    // console.log(this.props)
  }

  checkRequired() {
    const keysToFilter = ["brideValue", "groomValue", "addressValue", "dateValue", "startValue", "endValue", "emailValue", "waValue"]

    console.log(this.state)
    const filter = Object.fromEntries(
      Object.entries(this.state).filter(([key]) => keysToFilter.includes(key))
    );

    console.log(filter);

    return !Object.values(filter).some(value => value === '');;
  }

  reloadValidation(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.setState({
      brideValid: this.state.brideValue === '' ? false : true,
      groomValid: this.state.groomValue === '' ? false : true,
      addressValid: this.state.addressValue === '' ? false : true,
      dateValid: this.state.dateValue === '' ? false : true,
      startValid: this.state.startValue === '' ? false : true,
      endValid: this.state.endValue === '' ? false : true,
      emailValid: this.state.emailValue === '' && !emailRegex.test(this.state.emailValue) ? false : true,
      waValid: this.state.waValue === '' ? false : true,
      validateSubmit: this.checkRequired(),
    })
  }


  brideValuehandleChange = (event) => {
    if(event.target.value ===''){
      this.setState({
        brideValid: false,
        validateSubmit: false
      });
    }
    if(event.target.value !==''){
      this.setState({
        brideValid: true,
        validateSubmit: this.checkRequired()
      });
    }
    this.setState({
      brideValue: event.target.value,
    });
  };

  groomValuehandleChange = (event) => {
    console.log(event.target.value)
    if(event.target.value ===''){
      this.setState({
        groomValid: false,
        validateSubmit: false
      });
    }
    if(event.target.value !==''){
      this.setState({
        groomValid: true,
        validateSubmit: this.checkRequired()
      });
    }
    this.setState({
      groomValue: event.target.value,
      validateSubmit: this.checkRequired()
    });
  };

  addressValuehandleChange = (event) => {
    if(event.target.value ===''){
      this.setState({
        addressValid: false,
        validateSubmit: false
      });
    }
    if(event.target.value !==''){
      this.setState({
        addressValid: true,
        validateSubmit: this.checkRequired()
      });
    }
    this.setState({
      addressValue: event.target.value,
    });
  };

  dateValuehandleChange = (event) => {
    if(event.target.value ===''){
      this.setState({
        dateValid: false,
        validateSubmit: false
      });
    }
    if(event.target.value !==''){
      this.setState({
        dateValid: true,
        validateSubmit: this.checkRequired()
      });
    }
    this.setState({
      dateValue: event.target.value,
      validateSubmit: this.checkRequired()
    });
  };

  startValuehandleChange = (event) => {
    if(event.target.value ===''){
      this.setState({
        startValid: false,
        validateSubmit: false
      });
    }
    if(event.target.value !==''){
      this.setState({
        startValid: true,
        validateSubmit: this.checkRequired()
      });
    }
    this.setState({
      startValue: event.target.value,
      validateSubmit: this.checkRequired()
    });
  };

  endValuehandleChange = (event) => {
    if(event.target.value ===''){
      this.setState({
        endValid: false,
        validateSubmit: false
      });
    }
    if(event.target.value !==''){
      this.setState({
        endValid: true,
        validateSubmit: this.checkRequired()
      });
    }
    this.setState({
      endValue: event.target.value,
      validateSubmit: this.checkRequired()
    });
  };

  emailValuehandleChange = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log();
    if(this.state.emailValue === '' && !emailRegex.test(this.state.emailValue)){
      this.setState({
        emailValid: false,
        validateSubmit: false
      });
    }
    if(event.target.value !=='' && emailRegex.test(this.state.emailValue)){
      this.setState({
        emailValid: true,
        validateSubmit: this.checkRequired()
      });
    }
    this.setState({
      emailValue: event.target.value,
      validateSubmit: this.checkRequired()
    });
  };

  waValuehandleChange = (event) => {
    if(event.target.value ===''){
      this.setState({
        waValid: false,
        validateSubmit: false
      });
    }
    if(event.target.value !==''){
      this.setState({
        waValid: true,
        validateSubmit: this.checkRequired()
      });
    }
    this.setState({
      waValue: event.target.value,
      validateSubmit: this.checkRequired()
    });
  };

  igBridehandleChange = (event) => {
    this.setState({ igBrideValue: event.target.value });
  };
  igGroomhandleChange = (event) => {
    this.setState({ igGroomValue: event.target.value });
  };

  igVendorhandleChange = (event) => {
    this.setState({ igVendorValue: event.target.value });
  };

  notehandleChange = (event) => {
    this.setState({ noteValue: event.target.value });
  };

  handleConfirmBooking = async () => {
    const packageItem = this.props.router.location.state.package || [];
    const bookingData = {
      bride: this.state.brideValue,
      groom: this.state.groomValue,
      service: packageItem[0],
      package: packageItem[1]?.title,
      eventDate: this.state.dateValue,
      startTime: this.state.startValue,
      endTime: this.state.endValue,
      email: this.state.emailValue,
      phoneWA: this.state.waValue,
      eventAddress: this.state.addressValue,
      brideInstagram: this.state.igBrideValue,
      groomInstagram: this.state.igGroomValue,
      vendorInstagram: this.state.igVendorValue,
      note: this.state.noteValue,
      price: packageItem[1]?.price,
      minimalDp: packageItem[1]?.['minimal-dp'],
    };

    if (!this.checkRequired()) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    try {
      await insertBooking(bookingData);
      await axios.post(WHATSAPP_API_URL, bookingData);
      alert('Booking terkirim ke admin WhatsApp');
    } catch (error) {
      console.error('Error sending booking:', error);
      alert('Gagal mengirim booking ke WhatsApp admin. Cek console untuk detail.');
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    // this.reloadValidation();
    // console.log("testttt" + JSON.stringify(this.state))
    // console.log(event.target.elements.username.value)
    // console.log(event.target.username.value)
    // this.setState({
    //   [state]: index,
    // });
    this.setState(
      this.state
    )
    this.reloadValidation();

  };


  render() {
    // const { packageItem } = this.state;
    const packageItem = this.props.router.location.state.package;

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
                      <Form role="form" onSubmit={this.handleSubmit}>
                        <Row>
                          <Col md="6">
                            <FormGroup className={`mb-3 ${this.state.brideValid ? '' : 'has-danger'}`}>
                              <label className="text-black-50">
                                Nama Pengantin Wanita
                              </label>
                              <Input
                                className={`${this.state.brideValid ? '' : 'is-invalid'}`}
                                placeholder={`${this.state.brideValid ? '' : 'Harus di isi'}`}
                                type="text"
                                name="bride"
                                value={this.state.brideValue}
                                onChange={this.brideValuehandleChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <label className="text-black-50">
                              Nama Pengantin Pria
                            </label>
                            <FormGroup className={`mb-3 ${this.state.groomValid ? '' : 'has-danger'}`}>
                              <Input
                                className={`${this.state.groomValid ? '' : 'is-invalid'}`}
                                placeholder={`${this.state.groomValid ? '' : 'Harus di isi'}`}
                                type="text"
                                name="groom"
                                value={this.state.groomValue}
                                onChange={this.groomValuehandleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <FormGroup className={`mb-3 ${this.state.addressValid ? '' : 'has-danger'}`}>
                          <label className="text-black-50">
                            Lokasi Acara
                          </label>
                          <Input
                            className={`${this.state.addressValid ? '' : 'is-invalid'}`}
                            placeholder={`${this.state.addressValid ? '' : 'Harus di isi'}`}
                            type="textarea"
                            onChange={this.addressValuehandleChange}
                          />
                        </FormGroup>
                        <FormGroup className={`mb-3 ${this.state.dateValid ? '' : 'has-danger'}`}>
                          <label className="text-black-50">
                            Tanggal Acara
                          </label>
                          <Input
                            className={`${this.state.dateValid ? '' : 'is-invalid'}`}
                            placeholder={`${this.state.dateValid ? '' : 'Harus di isi'}`}
                            type="date"
                            value={this.state.dateValue}
                            onChange={this.dateValuehandleChange}
                          />
                        </FormGroup>
                        <Row>
                          <Col md="6" sm="6" xs="6">
                            <FormGroup className={`mb-3 ${this.state.startValid ? '' : 'has-danger'}`}>
                              <label className="text-black-50">
                                Mulai Acara
                              </label>
                              <Input
                                className={`${this.state.startValid ? '' : 'is-invalid'}`}
                                placeholder={`${this.state.startValid ? '' : 'Harus di isi'}`}
                                type="time"
                                value={this.state.startValue}
                                onChange={this.startValuehandleChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6" sm="6" xs="6">
                            <FormGroup className={`mb-3 ${this.state.endValid ? '' : 'has-danger'}`}>
                              <label className="text-black-50">
                                Selesai Acara
                              </label>
                              <Input
                                className={`${this.state.endValid ? '' : 'is-invalid'}`}
                                placeholder={`${this.state.endValid ? '' : 'Harus di isi'}`}
                                type="time"
                                value={this.state.endValue}
                                onChange={this.endValuehandleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <FormGroup className={`mb-3 ${this.state.emailValid ? '' : 'has-danger'}`}>
                          <label className="text-black-50">
                            Email
                          </label>
                          <Input
                            className={`${this.state.emailValid ? '' : 'is-invalid'}`}
                            placeholder={`${this.state.emailValid ? '' : 'Harus di isi dengan format email yang benar'}`}
                            type="text"
                            value={this.state.emailValue}
                            onChange={this.emailValuehandleChange}
                          />
                        </FormGroup>
                        <FormGroup className={`mb-3 ${this.state.waValid ? '' : 'has-danger'}`}>
                          <label className="text-black-50">
                            No. Whatsapp
                          </label>
                          <Input
                            className={`${this.state.waValid ? '' : 'is-invalid'}`}
                            placeholder={`${this.state.waValid ? '' : 'Harus di isi'}`}
                            type="number"
                            value={this.state.waValue}
                            onChange={this.waValuehandleChange}
                          />
                        </FormGroup>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label className="text-black-50">
                                IG Pengantin Wanita
                              </label>
                              <Input
                                className=""
                                placeholder=""
                                type="text"
                                value={this.state.idBrideValue}
                                onChange={this.igBridehandleChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup >
                              <label className="text-black-50">
                                IG Pengantin Pria
                              </label>
                              <Input
                                className=""
                                placeholder=""
                                type="text"
                                value={this.state.igGroomValue}
                                onChange={this.igGroomhandleChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <FormGroup>
                          <label className="text-black-50">
                            IG Vendor (MUA,Dekor, Band, dll)
                          </label>
                          <Input
                            className=""
                            placeholder=""
                            type="text"
                            onChange={this.igVendorhandleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label className="text-black-50">
                            Catatan
                          </label>
                          <Input
                            className=""
                            placeholder=""
                            type="text"
                            value={this.state.noteValue}
                            onChange={this.notehandleChange}
                          />
                        </FormGroup>
                        <div className="text-center">
                          <ConfirmationSubmit
                            data={this.state}
                            packageTitle={packageItem[1]?.title}
                            price={packageItem[1]?.price}
                            minimalDp={packageItem[1]?.['minimal-dp']}
                            onConfirm={this.handleConfirmBooking}
                          />
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
