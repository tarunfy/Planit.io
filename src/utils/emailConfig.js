import emailjs from "@emailjs/browser";

export const sendEmail = (payload) => {
  emailjs.send(
    "service_skzc487",
    "template_0qnlp2b",
    payload,
    "DtJ0y23kBExowS9Sx"
  );
};
