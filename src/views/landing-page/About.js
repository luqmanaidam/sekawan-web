import Testimonials from "components/Testimonials";
import React from "react";

// reactstrap components
import { Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: require("assets/img/team/team-1.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/team/team-2.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
];

class About extends React.Component {
  render() {
    return (
      <>
        <section className="section section-shaped">

          <Container className="py-md">
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/brand/sekawan-logo.png")}
                  style={{ width: "40%" }}
                />
                <p className="text-black-50 mt-4">
                  We are a story telling wedding photography & cinematic video.
                </p>

                <p className="text-black-50 mt-1">
                  We capture moments with honesty and pure emotions, and we love telling those stories for you.
                </p>
                <p className="text-black-50 mt-1">
                  we believe that every couple has unique stories to tell.
                </p>

                <p className="text-black-50 mt-1">
                  Stories are like journeys, they have different paths and chapters. Let us be a part of your journey.
                </p>

                <p className="text-black-50 mt-1">
                  With Love,
                </p>
                <p className="text-black-50 mt-2">
                  Sekawan Stories.
                </p>

                <p className="text-white mt-4"></p>
                <p className="text-white mt-4"></p>
                <p className="text-white mt-4"></p>

              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={items} />
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="pt-lg pb-100">
            <Row className="text-center justify-content-center">
              <Col lg="12" xs="12">
                <h2 className="display-4 text-black-50 text-center"><span>Why choose us?</span></h2>
                <p className="text-black-50">
                  We love to create epic images and videos, actually we are obsessed with it.
                  The reason why you should choose us as your wedding photographer and videographer
                </p>
              </Col>
            </Row>
            <Row className="row-grid mb-4 mb-md-0 mt-lg-2">
              <Col lg="4" md="4" sm="6" xs="6" className="mt-3 mt-lg-0 mt-sm-0 mt-md-0">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-settings text-black-50" />
                </div>
                <h5 style={{ fontSize: "1.1rem" }} className="text-black-50 mt-3">Experience</h5>
                <p style={{ fontSize: "0.9rem" }} className="text-black-50 mt-3">
                  More than 4 years as a professional wedding vendor documentation, worked on more than 1500 couples.
                </p>
              </Col>
              <Col lg="4" md="4" sm="6" xs="6" className="mt-3 mt-lg-0 mt-sm-0 mt-md-0">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-favourite-28 text-black-50" />
                </div>
                <h5 style={{ fontSize: "1.1rem" }} className="text-black-50 mt-3">Full Service</h5>
                <p style={{ fontSize: "0.9rem" }} className="text-black-50 mt-3">
                  We always provide personalized service to each couple we work with. Understand your vision and preferences, ensuring the result meet your specific needs
                </p>
              </Col>
              <Col lg="4" md="4" sm="6" xs="6" className="mt-3 mt-lg-0 mt-sm-0 mt-md-0">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-camera-compact text-black-50" />
                </div>
                <h5 style={{ fontSize: "1.1rem" }} className="text-black-50 mt-3">Quality Documentation</h5>
                <p style={{ fontSize: "0.9rem" }} className="text-black-50 mt-3">
                  We offer high-quality photo prints, albums, and cinematic videos to help you preserve and showcase your wedding memories for years to come.
                </p>
              </Col>
              <Col lg="4" md="4" sm="6" xs="6" className="mt-3 mt-lg-0 mt-sm-0 mt-md-0">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-spaceship text-black-50" />
                </div>
                <h5 style={{ fontSize: "1.1rem" }} className="text-black-50 mt-3">Creativity</h5>
                <p style={{ fontSize: "0.9rem" }} className="text-black-50 mt-3">
                  Our team is not just skilled technically, we also bring a creative eye to our work. We capture the emotions and atmosphere of your wedding day.
                </p>
              </Col>
              <Col lg="4" md="4" sm="6" xs="6" className="mt-3 mt-lg-0 mt-sm-0 mt-md-0">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-satisfied text-black-50" />
                </div>
                <h5 style={{ fontSize: "1.1rem" }} className="text-black-50 mt-3">Positive Testimonials</h5>
                <p style={{ fontSize: "0.9rem" }} className="text-black-50 mt-3">
                  Our past clients have to say about their good experience with us. Positive reviews and testimonials can provide valuable insight to our team.
                </p>
              </Col>
              <Col lg="4" md="4" sm="6" xs="6" className="mt-3 mt-lg-0 mt-sm-0 mt-md-0">
                <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <i className="ni ni-money-coins text-black-50" />
                </div>
                <h5 style={{ fontSize: "1.1rem" }} className="text-black-50 mt-3">Value for Money</h5>
                <p style={{ fontSize: "0.9rem" }} className="text-black-50 mt-3">
                  We may not be the cheapest option, we believe that we offer excellent value for money. Investing in memories that will last a lifetime.
                </p>
              </Col>
            </Row>
          </Container>


          <Row className="justify-content-center text-center mb-md mt-sm">
            <Col lg="8">
              <h2 className="display-4 text-black-50 text-center"><span>Testimonials</span></h2>
              <p className="text-black-50">
                Our past clients have to say about their good experience with us. Every insight, reviews, and testimonials become valuable to our team.
              </p>
            </Col>
          </Row>
          {/* <Container className> */}
            <Testimonials></Testimonials> 
          {/* </Container> */}


          {/* SVG separator */}

        </section>
      </>
    );
  }
}

export default About;
