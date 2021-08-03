const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_RASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    async sendActivationMail(to, link, name) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Hello ${name}`,
            text: '',
            html:
                `<div>
                    <h3 style="text-align:center"> Thank you for choosing Task manager </h3>
                    <h2 style="text-align:center"> Please confirm your email. We don't spam </h2>
                    <button style=" margin-left: 45%; padding: 10px; background-color: darkseagreen; border: none; border-radius: 5px;">
                        <a  href=${link} style="text-decoration: none; color: white;">confirm email</a>
                    </button>
                </div>`
        })
    }
}

module.exports = new MailService();
