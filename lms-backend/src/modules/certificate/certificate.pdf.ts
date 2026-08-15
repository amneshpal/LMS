// import PDFDocument from "pdfkit";

// interface CertificateData {
//   studentName: string;
//   courseName: string;
//   certificateNumber: string;
//   issueDate: Date;
// }

// export const generateCertificatePDF = (
//   data: CertificateData
// ): PDFKit.PDFDocument => {

//   const doc = new PDFDocument({
//     size: "A4",
//     layout: "landscape",
//     margin: 50,
//   });

//   // Border
//   doc
//     .lineWidth(4)
//     .rect(20, 20, 800, 550)
//     .stroke("#0B6BD6");

//   // Title
//   doc
//     .fontSize(32)
//     .fillColor("#0B6BD6")
//     .text("CERTIFICATE", {
//       align: "center",
//     });

//   doc
//     .fontSize(18)
//     .fillColor("black")
//     .text("OF COMPLETION", {
//       align: "center",
//     });

//   doc.moveDown(2);

//   doc
//     .fontSize(18)
//     .text("This Certificate is Proudly Presented To", {
//       align: "center",
//     });

//   doc.moveDown();

//   doc
//     .fontSize(34)
//     .fillColor("#1E3A8A")
//     .text(data.studentName.toUpperCase(), {
//       align: "center",
//     });

//   doc.moveDown();

//   doc
//     .fontSize(18)
//     .fillColor("black")
//     .text("For Successfully Completing", {
//       align: "center",
//     });

//   doc.moveDown();

//   doc
//     .fontSize(28)
//     .fillColor("#16A34A")
//     .text(data.courseName, {
//       align: "center",
//     });

//   doc.moveDown(2);

//   doc
//     .fontSize(16)
//     .fillColor("black")
//     .text(
//       `Certificate No : ${data.certificateNumber}`,
//       {
//         align: "center",
//       }
//     );

//   doc.text(
//     `Issue Date : ${data.issueDate.toDateString()}`,
//     {
//       align: "center",
//     }
//   );

//   doc.moveDown(4);

//   doc.text(
//     "Instructor Signature                     Director Signature",
//     {
//       align: "center",
//     }
//   );

//   doc.end();

//   return doc;
// };


import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import path from "path";

interface CertificateData {
  studentName: string;
  courseName: string;
  certificateNumber: string;
  issueDate: Date;
}

export const generateCertificatePDF = async (
  data: CertificateData
) => {

  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 40,
  });

  // Border

  doc
    .lineWidth(5)
    .rect(20,20,800,550)
    .stroke("#0B6BD6");

  // Logo

  const logo = path.join(
    process.cwd(),
    "src",
    "assets",
    "logo.png"
  );

  doc.image(logo,45,35,{
    width:70
  });

  // Title

  doc
    .fontSize(34)
    .fillColor("#0B6BD6")
    .text("CERTIFICATE OF COMPLETION",0,50,{
      align:"center"
    });

  doc.moveDown(2);

  doc
    .fontSize(20)
    .fillColor("black")
    .text("This Certificate is Presented To",{
      align:"center"
    });

  doc.moveDown();

  doc
    .fontSize(36)
    .fillColor("#1E3A8A")
    .text(data.studentName,{
      align:"center"
    });

  doc.moveDown();

  doc
    .fontSize(18)
    .fillColor("black")
    .text("For Successfully Completing",{
      align:"center"
    });

  doc.moveDown();

  doc
    .fontSize(28)
    .fillColor("#16A34A")
    .text(data.courseName,{
      align:"center"
    });

  doc.moveDown(2);

  doc.fontSize(16);

  doc.text(
    `Certificate No : ${data.certificateNumber}`,
    {
      align:"center"
    }
  );

  doc.text(
    `Issue Date : ${data.issueDate.toDateString()}`,
    {
      align:"center"
    }
  );

  // QR Code

  const verifyUrl =
`https://examhelpofficial.com/verify/${data.certificateNumber}`;

  const qr = await QRCode.toDataURL(
    verifyUrl
  );

  const qrBuffer = Buffer.from(
    qr.replace(
      /^data:image\/png;base64,/,
      ""
    ),
    "base64"
  );

  doc.image(
    qrBuffer,
    650,
    360,
    {
      width:120
    }
  );

  doc.text(
    "Scan To Verify",
    650,
    490
  );

  // Signature

  doc.text(
    "Instructor",
    120,
    500
  );

  doc.text(
    "Director",
    620,
    500
  );

  doc.end();

  return doc;

};