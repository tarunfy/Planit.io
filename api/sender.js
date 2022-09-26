const nodemailer = require("nodemailer");
const ical = require("ical-generator");
const moment = require("moment");

function getIcalObjectInstance(
  starttime,
  title,
  description,
  meetLink,
  name,
  email
) {
  const cal = ical({
    domain: "locahost:3000",
    name: "Planit meeting",
  });

  cal.createEvent({
    start: starttime, // eg : moment()
    title: title, // 'Summary of your event'
    description: description, // 'More description'
    url: meetLink, // 'event url'
    organizer: {
      // 'organizer details'
      name: name,
      email: email,
    },
  });
  return cal;
}

async function sendemail(req, calendarObj = null) {
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

  if (calendarObj) {
    let alternatives = {
      "Content-Type": "text/calendar",
      method: "REQUEST",
      content: Buffer.from(calendarObj.toString()),
      component: "VEVENT",
      "Content-Class": "urn:content-classes:calendarmessage",
    };
    mailOptions["alternatives"] = alternatives;
    mailOptions["alternatives"]["contentType"] = "text/calendar";
    mailOptions["alternatives"]["content"] = Buffer.from(
      calendarObj.toString()
    );
  }

  if (req.method === "POST") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      name: "Planit.io",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail(mailOptions);
  }
}

module.exports = async (req, res) => {
  const momentObj = moment(req.body.meet_date, "DD-MM-YYYY");
  const momentStr = momentObj.format("LL");

  const calObj = getIcalObjectInstance(
    momentStr,
    req.body.data.eventName,
    req.body.data.description,
    req.body.meet_link,
    req.body.data.name,
    req.body.data.email
  );

  calObj.data["url"] = req.body.meet_link;
  calObj.data["ttl"] = req.body.data.eventName;

  await sendemail(req, calObj);
  return res.send({ msg: "Success, mail sent to owner" });
};
