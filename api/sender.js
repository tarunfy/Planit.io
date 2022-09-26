const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      name: "Planit.io",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.reply_to,
      subject: `Planit: Your meeting has been scheduled`,
      html: `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Planitio email</title>
          </head>
          <body>  
            <p>Hello, Your meeting has been scheduled with ${req.body.user_name} (${req.body.user_email}). Here are the details for the same.</p>
            <br/>
            <p>Meeting link: ${req.body.meet_link}</p>
            <br/>
            <p>Meeting time: ${req.body.meet_date} ${req.body.meet_time}</p>
            <p>Best wishes,</p>
            <p>Planit.io team.</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.send({ msg: "Success, mail sent to owner" });
  }
};
