"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
var sendVisitorMail = (timeOfVisit, timeSpentOnWebsite, location) => {
    let message = {
        from: `${process.env.SMTP_USER}`,
        to: `${process.env.RECIPIENT_EMAIL}`,
        subject: "sombody visited your website",
        html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #333;
              margin: 0;
              padding: 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 16px;
              border: 1px solid #ccc;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>Visit Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Location: <b>${location}</b></td>
              </tr>
              <tr>
                <td>Time of Visit: <b>${timeOfVisit}</b></td>
              </tr>
              <tr>
                <td>Time Spent on Website: <b>${timeSpentOnWebsite}</b> seconds</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `,
    };
    return transporter
        .sendMail(message)
        .then((info) => {
        console.log(`SUCCESS:${info}`);
        return `Message sent:${info.messageId} \n Preview URL:${nodemailer.getTestMessageUrl(info)}`;
    })
        .catch((err) => {
        console.error(err);
        return `Error occurred. ${err.message}`;
    });
};
exports.default = sendVisitorMail;
