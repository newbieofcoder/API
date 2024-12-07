var express = require("express");
var router = express.Router();
const XeMay = require("../models/xemay");
const upload = require("../config/common/upload");

router.post(
  "/add-XeMay-with-image",
  upload.array("url", 1),
  async (req, res, next) => {
    try {
      const data = req.body;
      const { files } = req;
      const urlsImage = files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
      const xemay = new XeMay({
        ten_xe: data.ten_xe,
        mau_sac: data.mau_sac,
        gia_ban: data.gia_ban,
        mo_ta: data.mo_ta,
        hinh_anh: urlsImage,
      });
      const result = await xemay.save();
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/test", async (req, res) => {
  res.send("This is the test route");
});

router.get("/", async (req, res) => {
  try {
    const xemay = await XeMay.find();
    res.json(xemay);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add_xe_may", async (req, res) => {
  try {
    let xe = req.body;
    await XeMay.create(xe);
    let xemay = await XeMay.find();
    res.json(xemay);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update_xe_may/", async (req, res) => {
  try {
    const id = req.body._id;
    let xemay = req.body;
    let result = await XeMay.findByIdAndUpdate(id, xemay, { new: true });
    if (result) {
      let xe = await XeMay.find();
      res.json(xe);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete_xe_may/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await XeMay.findByIdAndDelete(id);
    if (result) {
      let xemay = await XeMay.find();
      res.json(xemay);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/search_xe_may/:ten_xe", async (req, res) => {
  try {
    const { ten_xe } = req.params;
    const regex = new RegExp(ten_xe, "i");
    const data = await XeMay.find({ ten_xe: regex });
    if (data) {
      res.json(data);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
