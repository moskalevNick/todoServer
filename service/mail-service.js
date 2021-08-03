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
                `
                    <div>
                        <h3> Thank you for choosing Task manager </h3>
                        <h1> Please confirm your email. We don't spam </h1>
                        <button href="${link}">confirm</button>
                    </div>
                `
        })
    }
}

module.exports = new MailService();
