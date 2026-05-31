import React from "react";
// reactstrap components
import {
    Button,
    Modal,
    Row,
    Col
} from "reactstrap";

export default function ConfirmationSubmit({ data, packageTitle, price, minimalDp, onConfirm }) {
    // console.log(data)
    const [open, setOpen] = React.useState(false);

    // console.log(validateOpen)
    const handleOpen = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!data?.validateSubmit) {
            alert('Mohon isi semua field yang wajib diisi');
            return;
        }
        setOpen(true);
    };
    const formatCurrency = (value) => {
        if (value === null || value === undefined || value === '') return '-';
        const text = String(value).trim();
        const raw = text.replace(/[^0-9]+/g, '');
        if (!raw) return text;
        const formatted = new Intl.NumberFormat('id-ID').format(Number(raw));
        return `Rp. ${formatted}`;
    };

    const fields = [
        { label: 'Nama Paket', value: packageTitle },
        { label: 'Harga', value: formatCurrency(price) },
        { label: 'Minimal DP', value: formatCurrency(minimalDp) },
        { label: 'Nama Pengantin Wanita', value: data?.brideValue },
        { label: 'Nama Pengantin Pria', value: data?.groomValue },
        { label: 'Lokasi Acara', value: data?.addressValue },
        { label: 'Tanggal Acara', value: data?.dateValue },
        { label: 'Mulai', value: data?.startValue },
        { label: 'Selesai', value: data?.endValue },
        { label: 'Email', value: data?.emailValue },
        { label: 'No. Whatsapp', value: data?.waValue },
        { label: 'IG Pengantin Wanita', value: data?.igBrideValue },
        { label: 'IG Pengantin Pria', value: data?.igGroomValue },
        { label: 'IG Vendor', value: data?.igVendorValue },
        { label: 'Catatan', value: data?.noteValue }
    ];

    const handleConfirm = () => {
        if (onConfirm) onConfirm(data);
        setOpen(false);
    };

    return (
        <>
            <Row className="justify-content-center">
                <Col md="4">
                    <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        name='submit'
                        disabled={!data?.validateSubmit}
                        onClick={handleOpen}
                    >
                        Book
                    </Button>
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={open}
                        toggle={() => setOpen(!open)}
                    >
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">
                                Konfirmasi Booking
                            </h6>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => setOpen(!open)}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div style={{maxHeight: '60vh', overflow: 'auto'}}>
                                <dl className="row mb-0">
                                    {fields.map((f, i) => (
                                        <React.Fragment key={i}>
                                            <dt className="col-5 text-black-50">{f.label}</dt>
                                            <dd className="col-7">{f.value || '-'}</dd>
                                        </React.Fragment>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button color="primary" type="button" onClick={handleConfirm}>
                                Confirm Booking
                            </Button>
                            <Button
                                className="ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => setOpen(!open)}
                            >
                                Close
                            </Button>
                        </div>
                    </Modal>
                </Col>
            </Row>
        </>
    );
}

