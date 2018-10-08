const request = require('request-promise')
const parse = require('xml2js').parseString

const email = 'thiagonovato@gmail.com'
const token = '35B47A3A9EEA4D129E71F1CB372D16A0'

/*
// Checkout
request({
    uri: 'https://ws.pagseguro.uol.com.br/v2/checkout',
    method: 'POST',
    form: {
        token: token,
        email: email,
        currency: 'BRL',
        itemId1: 'idCampanha',
        itemDescription1: 'Doação',
        itemQuantity1: '1',
        itemAmount1: '2.00'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
})
    .then(data => {
        parse(data, (err, json) => {
            console.log(json.checkout.code[0])
        })
    })*/

const notificationCode = '16DAD7-F881F581F58B-F004753FA1S8-578837'
const consultaNotificacao = 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications/'
request(consultaNotificacao + notificationCode + '?token=' + token + '&' + email)
    .then(notificationXML => {
        parse(notificationXML, (err, transaction) => {
            console.log(transaction.transaction)
        })
    })