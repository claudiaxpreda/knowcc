const nodemailer = require('nodemailer')
const { getSecret } = require('docker-secret')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_ENV === 'development' ? process.env.EMAIL : getSecret(process.env.EMAIL_FILE),
    pass: process.env.NODE_ENV === 'development' ? process.env.PASSWORD : getSecret(process.env.PASSWORD_FILE),
  }
})

async function sendNotificationEmail(email, username) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'knowCC: New Pending Challenge',
    html: `<p>Hello ${username}, you have a new pending challenge.`
  }

  transporter.sendMail(mailOptions, err => {
    if (err) {
      console.log('Error occured')
    }

    console.log('Email sent')
  })
}

module.exports = { sendNotificationEmail }
