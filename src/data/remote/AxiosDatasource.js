import axios from 'axios';

async function sendNotifWABooking(bookingDetail) {

    const data = {
        messaging_product: 'whatsapp',
        to: bookingDetail.whatsappTo,
        type: 'template',
        template: {
            name: bookingDetail.whatsappTemplate,
            language: {
                code: 'id'
            },
            components: [
                {
                    type: 'body',
                    parameters: [
                        {
                            type: 'text',
                            text: bookingDetail.service
                        },
                        {
                            type: 'text',
                            text: bookingDetail.package
                        },
                        {
                            type: 'text',
                            text: bookingDetail.eventDate + ' (' + bookingDetail.startTime + ' - ' + bookingDetail.endTime + ')'
                        },
                        {
                            type: 'text',
                            text: bookingDetail.bride
                        },
                        {
                            type: 'text',
                            text: bookingDetail.groom
                        },
                        {
                            type: 'text',
                            text: bookingDetail.eventAddress
                        },
                        {
                            type: 'text',
                            text: bookingDetail.email
                        },
                        {
                            type: 'text',
                            text: bookingDetail.phoneWA
                        },
                        {
                            type: 'text',
                            text: bookingDetail.brideInstagram
                        },
                        {
                            type: 'text',
                            text: bookingDetail.groomInstagram
                        },
                        {
                            type: 'text',
                            text: bookingDetail.vendorInstagram
                        },
                        {
                            type: 'text',
                            text: bookingDetail.price
                        },
                        {
                            type: 'text',
                            text: bookingDetail.minimalDp
                        },
                        {
                            type: 'text',
                            text: bookingDetail.bookingId
                        }
                    ]
                }
            ]
        }
    }
    const headers = {
        'Authorization': process.env.REACT_APP_WHATSAPP_PERMANENT_TOKEN_AUTH,
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
    const url = process.env.REACT_APP_WHATSAPP_API_BASEURL

    await axios.post(url, data, {
        headers: headers
    })
    .then(function (response) {
        console.log('Success send notif' + JSON.stringify(response));
    })
    .catch(function (error) {
        console.error('Error send WA notification: ', error);
    });


}

export default sendNotifWABooking;
