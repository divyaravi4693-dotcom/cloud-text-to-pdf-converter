const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

const pdfFolder = path.join(__dirname, "pdfs");

if (!fs.existsSync(pdfFolder)) {
    fs.mkdirSync(pdfFolder);
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/convert", (req, res) => {

    const text = req.body.text;

    if (!text) {
        return res.send("Please enter some text.");
    }

    const fileName = "PDF_" + Date.now() + ".pdf";
    const filePath = path.join(pdfFolder, fileName);

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(22)
       .fillColor("blue")
       .text("Text To PDF Converter", {
           align: "center"
       });

    doc.moveDown();

    doc.fontSize(14)
       .fillColor("black")
       .text(text);

    doc.end();

    doc.on("end", () => {

        res.send(`
<!DOCTYPE html>

<html>

<head>

<title>PDF Created</title>

<style>

body{

font-family:Arial;

display:flex;

justify-content:center;

align-items:center;

height:100vh;

background:linear-gradient(135deg,#00c6ff,#0072ff);

margin:0;

}

.card{

background:white;

padding:40px;

border-radius:20px;

text-align:center;

box-shadow:0 10px 25px rgba(0,0,0,.3);

}

a{

display:block;

margin:15px;

padding:14px;

background:#2563eb;

color:white;

text-decoration:none;

border-radius:10px;

font-weight:bold;

}

</style>

</head>

<body>

<div class="card">

<h2>✅ PDF Created Successfully</h2>

<a href="/pdfs/${fileName}" target="_blank">📄 View PDF</a>

<a href="/pdfs/${fileName}" download>⬇ Download PDF</a>

<a href="/">🏠 Back</a>

</div>

</body>

</html>

`);

    });

});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:3000");
});