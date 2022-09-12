const express = require('express'),
path = require('path'),
nodeMailer = require('nodemailer'),
bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
//app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

app.get('/', function (req, res) {
    res.render('index');
});
app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: ''
        }
    });
    let mailOptions = {
        from: '', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: '<b>Hello Admin</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
});


app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});