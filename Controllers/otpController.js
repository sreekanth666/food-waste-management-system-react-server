const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "srkth777@gmail.com",
        pass: "ruimwbkpordxbazv"
    }
})

exports.otpGenerator = async(req, res) => {
    const otp = otpGenerator.generate(6, {lowerCaseAlphabets: false, specialChars:false})
    const {email} = req.body
    console.log(email);
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; box-sizing: border-box;">
        <div style="background-color: #16a34a; padding: 1rem; text-align: center; color: white;">
            <h2 style="font-weight: 500; margin: 0;">OTP to change your password</h2>
        </div>
        <div style="padding-top: 2rem; padding-bottom: 2rem; text-align: center;">
            <h1>${otp}</h1>
        </div>
        <div style="text-align: center; margin: 0.5rem;">
            <p>Never share OTP with anyone</p>
        </div>
        <div style="background-color: #16a34a; padding: 2rem; color: white; text-align: center; margin-top: 2rem;">
            <h2 style="font-weight: 500; margin: 0;">Smile Organization</h2>
            <p style="margin: 0;">Bringing hearts together</p>
        </div>
    </body>
    </html>`

    const mailOptions = {
        from: "srkth777@gmail.com",
        to: email,
        subject: `OTP for changing password ${otp}`,
        text: `OTP for changing password: ${otp}`,
        html
    }

    try {
        const emailStatus = await transporter.sendMail(mailOptions)
        res.status(200).json(otp)
    } catch (error) {
        res.status(401).json(error)
    }
}