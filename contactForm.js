'use strict'

let nodemailer = require('nodemailer')
let request = require('request')
let fs = require('fs')

// email data for verification
let emailInfo = {
	email: '',
	password: '',
	service: 'Gmail',
	recaptchaPublicKey: ''
}

module.exports = function (req, res, next) {

	// create google recaptcha data
	let data = {
        remoteip:  req.connection.remoteAddress,
        secret: emailInfo.recaptchaPublicKey,
        response:  req.body.recaptcha
    }

    // send POST request to google recaptcha servers for verificaiton
    request({
    	method: 'POST',
    	uri: 'https://www.google.com/recaptcha/api/siteverify',
    	qs: data
  	}, function (error, resReq, body) {
  		// if request itself sent back an error then send error
  		if(error){
        fs.appendFile('emailError.txt', error, 'utf8' , (err) => {})
  			res.json({error: 'Error with recaptcha authentication!'})
  			console.log('error')
  		}

  		// if recaptcha worked then send email else send error message
  		if(JSON.parse(body).success){
  			email(req, res, next)
  		}
  		else{
  			res.json({error: 'Error: receptcha did not validate!'})
  		}
  	})
}


function email (req, res, next) {

  // create smtp config
	let smtpConfig = {
    	service: emailInfo.service,
        auth: {
            user: emailInfo.email,
            pass: emailInfo.password
        }
    }

  // create smtp object to send email
 	let transporter = nodemailer.createTransport(smtpConfig)
	
	// create email message settings
  let mailOptions = {
		from: req.body.email,
		to: emailInfo.email,
		subject: 'Website Contact Form',
		text: 'From: ' + req.body.name + ' \n Email address:' + req.body.email +' \n Message: ' + req.body.message
	}

	// try to send email
	transporter.sendMail(mailOptions, function (error, info) {
	    if (error) {
          fs.appendFile('emailError.txt', error, 'utf8' , (err) => {})
	        res.json({error: 'Error message not sent!'})
	    } else {
	        res.json({info: 'Sent!'})
	    }
	})
}