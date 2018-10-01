import multer from "multer";
import express from "express";
const MAX_SIZE = 10 * 1024 * 1024;
var upload = multer({
  dest: "uploads/",
  limits: { fileSize: MAX_SIZE }
});

export default function({ fileName, mediaDomainLogic: { c }, onError }) {
  var apiRoutes = express.Router();
  apiRoutes.post("/upload", upload.single(fileName), (req, res) => {
    let query = req.body;
    let { shallIPass, criteria } = c(user);
    if (shallIPass) {
      console.log(req.file);
    }
  });

  return apiRoutes;
}
