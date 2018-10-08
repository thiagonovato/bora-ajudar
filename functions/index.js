const functions = require('firebase-functions')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()


// INTEGRAÇÃO PAGSEGURO
const request = require('request-promise')
const parse = require('xml2js').parseString

const email = 'thiagonovato@gmail.com'
const token = '35B47A3A9EEA4D129E71F1CB372D16A0'
const checkouUrl = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code='

// FIM INTEGRAÇÃO PAGSEGURO

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('BoraAjudar Server')
})

app.post('/donate', (req, res) => {
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
                res.send({
                    url: checkouUrl + json.checkout.code[0]
                })
            })
        })
})

exports.api = functions.https.onRequest(app)