const fs = require("fs");
const path = require("path");
const fontkit = require("fontkit");
const { PDFDocument } = require("pdf-lib");
const { rgb } = require("pdf-lib");
const { degrees } = require("pdf-lib");
const bloodRequestModel = require("../Models/Recivent-Model");
module.exports.pdfGenerator = async (req, res) => {
  const { id } = req.body;
  const post = await bloodRequestModel.findById(id).populate([
    {
      path: "reciventId",
      model: "user",
      select:
        "-password -__v -email -profilepic -pictype -googleId -createdAt -updatedAt -age -emergencycontact -socketId -verified -otpExpiry -otp -gender -weight -height -block",
    },
    {
      path: "donarId",
      model: "user",
      select:
        "-password -__v -email -profilepic -pictype -googleId -createdAt -updatedAt -age -emergencycontact -socketId -verified -otpExpiry -otp -gender -weight -height -block",
    },
  ]);

  const primaryfontBytes = fs.readFileSync(
    path.join(__dirname, "public/fonts/HelveticaNowDisplay-Black_20bf03d0.ttf")
  );
  const secondaryfontBytes = fs.readFileSync(
    path.join(__dirname, "public/fonts/66aa728085dec3390cb7f058_Satoshi-Variable.ttf")
    );
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const Helvetica = await pdfDoc.embedFont(primaryfontBytes);
    const Satoshi = await pdfDoc.embedFont(secondaryfontBytes);

    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.85, 0.94, 1),
    });

    page.drawText("Blood Hub", {
      x: width / 2 - 150,
      y: height / 2 - 180,
      size: 100,
      font: Helvetica, 
      color: rgb(0.85, 0.85, 0.85),
      rotate: degrees(45),
      opacity: 0.6,
    });

    page.drawRectangle({
      x: 20,
      y: 20,
      width: width - 40,
      height: height - 40,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 1,
      color: undefined,
    });
    // Load images
    const logoBytes = fs.readFileSync(path.join(__dirname, "public/images/Logo.png"));
    const stampBytes = fs.readFileSync(
      path.join(__dirname, "public/images/Stamp.png")
    );
    const signatureBytes = fs.readFileSync(
      path.join(__dirname, "public/images/signature-removebg-preview.png")
    );

    const logoImage = await pdfDoc.embedPng(logoBytes);
    const stampImage = await pdfDoc.embedPng(stampBytes);
    const signatureImage = await pdfDoc.embedPng(signatureBytes);

    // Draw logo
    page.drawImage(logoImage, {
      x: 40,
      y: height - 150,
      width: 100,
      height: 120,
    });

    // Title
    page.drawText("BLOOD REQUEST SUMMARY", {
      x: 50,
      y: height - 200,
      size: 16,
      font: Helvetica,
      color: rgb(1, 0, 0),
    });

    // Info
    page.drawText(`Date: ${post.date} `, {
      x: 400,
      y: height - 100,
      size: 10,
      font: Satoshi,
    });
    page.drawText(`Request ID: ${post.id.toString()} `, {
      x: 300,
      y: height - 120,
      size: 10,
      font: Satoshi,
    });

    // Receiver Info
    page.drawText("Receiver", { x: 50, y: height - 230, size: 14, font: Helvetica });
    page.drawText(`Name: ${post.reciventId.name}`, {
      x: 70,
      y: height - 260,
      size: 12,
      font: Satoshi,
    });
    page.drawText(`Blood Group: ${post.reciventId.bloodgroup}`, {
      x: 70,
      y: height - 280,
      size: 12,
      font: Satoshi,
    });

    // Donor Info
    page.drawText("Donor", { x: 50, y: height - 310, size: 14, font: Helvetica });
    page.drawText(`Name: ${post.donarId.name}`, {
      x: 70,
      y: height - 340,
      size: 12,
      font: Satoshi,
    });
    page.drawText(`Blood Group: ${post.donarId.bloodgroup}`, {
      x: 70,
      y: height - 360,
      size: 12,
      font: Satoshi,
    });
    page.drawText(`Contact: ${post.DonarNumber}`, {
      x: 70,
      y: height - 380,
      size: 12,
      font: Satoshi,
    });
    const declarationLines = [
      "Declaration:",
      "",
      "I hereby confirm that the details provided in this document are true and accurate",
      "to the best of my knowledge. This blood donation request is made in good faith,",
      "and all involved parties have been informed accordingly. Misuse or falsification",
      "of information may result in legal consequences under applicable laws.",
    ];

    let y = 420; 

    declarationLines.forEach((line, index) => {
      if(index === 0){
        page.drawText(line, {
          x: 70,
          y: y - index * 14,
          size: 14,
          font: Helvetica,
          color: rgb(0, 0, 0),
        });
      }else {
        page.drawText(line, {
          x: 70,
          y: y - index * 14,
          size: 12,
          font: Satoshi,
          color: rgb(0, 0, 0),
        });
      }
    });

    // Stamp and Signature
    page.drawImage(stampImage, { x: 500, y: 100, width: 50, height: 50 });
    page.drawImage(signatureImage, {
      x: 400,
      y: 40,
      width: 150,
      height: 60,
      rotate: degrees(0),
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=blood-request.pdf"
    );
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to generate PDF");
  }
};
