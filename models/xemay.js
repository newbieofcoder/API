const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const XeMay = new Scheme(
  {
    id: { type: String },
    ten_xe: { type: String, required: true },
    mau_sac: { type: String, required: true },
    gia_ban: { type: Number, required: true, default: 0 },
    mo_ta: { type: String },
    hinh_anh: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("xemay", XeMay);
