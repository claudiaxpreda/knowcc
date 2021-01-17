const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
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
