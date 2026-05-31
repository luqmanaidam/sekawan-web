import React from "react";
import { NumericFormat } from "react-number-format";

// reactstrap components
import { Card, CardBody, Col, Collapse, Row } from "reactstrap";

function TableBook(props) {
    const { serviceName, packageItem, serviceList, price, minDp } = props;
    const [collapseOpen, setCollapseOpen] = React.useState(true);
    let icon = null;

    if (collapseOpen) {
        icon = <i
            className="fa fa-lg fa-angle-down"
            id="collapse"
            onClick={() => {
                setCollapseOpen(collapseOpen => collapseOpen = false);
            }}
        />
    } else {
        icon = <i
            className="fa fa-lg fa-angle-up"
            id="uncollapse"
            onClick={() => {
                setCollapseOpen(collapseOpen => collapseOpen = true);
            }}
        />
    }

    return (
        <>

            <Card className="mt-3">
                <CardBody style={{ height: "3.5rem" }} className="px-lg-3 py-lg-3">
                    <Row>
                        <Col lg="11" md="11" sm="11" xs="11">
                            <p style={{ fontSize: "0.85rem" }} className="text-black-50 font-weight-bold ml-2">Package {serviceName} {packageItem}</p>
                        </Col>
                        {/* <Col lg="4" md="4" sm="4" xs="4">
                            <p style={{ fontSize: "0.85rem" }} className="text-black-50 font-weight-bold">{packageItem}</p>
                        </Col> */}
                        <Col lg="1" md="1" sm="1" xs="1">
                            {icon}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Collapse isOpen={collapseOpen}>
                <Card className=" card-body mb-3">
                    <Row className="ml-1">
                        <Col>
                            <p style={{ fontSize: "0.7rem" }} className="text-black-50 font-weight-bold mb-1">Detail </p>
                            {serviceList.map((body, index) => (
                                <p style={{ fontSize: "0.75rem" }} className="mt-0 mb-0 text-muted" key={index}>- {body}</p>
                            ))
                            }

                            <p style={{ fontSize: "0.7rem" }}
                                className="mt-3 mb-0 text-black-50 font-weight-bold"><bold>Special Price : </bold>
                                <NumericFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />
                            </p>
                            <p style={{ fontSize: "0.7rem" }}
                                className="mt-0 mb-0 text-black-50 font-weight-bold"><bold>Minimal DP : </bold>
                                <NumericFormat value={minDp} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />
                            </p>
                        </Col>


                    </Row>
                </Card>
            </Collapse>

        </>
    );
}

export default TableBook;