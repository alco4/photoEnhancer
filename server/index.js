const express = require("express"),
  app = express(),
  port = 5000,
  cors = require("cors");
const fileupload = require("express-fileupload");
const ImgixAPI = require("imgix-management-js");

var bodyParser = require("body-parser");

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const imgix = new ImgixAPI({
  apiKey: `ak_6a3e78602f6c98f4a1db6e365ef080e3286a90b416b09c3b5cc04fad8adbfcdf`,
});

app.post("/uploadFileAPI", (req, res) => {
  const file = req.files.file;
  imgix
    .request(`sources/upload/63c758275ea6794ad4301a69/${file.name}`, {
      method: "POST",
      body: file.data,
    })
    .then(() => res.send(file.name))
    .catch((e) => res.send(e?.response?.errors));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
