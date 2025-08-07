// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { name, email, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER, // your Gmail
//         pass: process.env.MAIL_PASS, // your Gmail App Password
//       },
//     });

//     const mailOptions = {
//       from: `"${name}" <${email}>`, // shows user's name and email
//       to: process.env.RECEIVER_EMAIL, // your email as owner
//       subject: `📩 New Message from Coffee Website: ${subject}`,
//       html: `
//         <h3>New Customer Message</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Email send error:", error);
//     return res.status(500).json({ message: "Email failed to send." });
//   }
// }


import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your@gmail.com',
        pass: 'your_app_password',
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'your@gmail.com',
      subject: `New message from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}
