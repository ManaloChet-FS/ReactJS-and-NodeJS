const express = require("express");
const router = express.Router();
const gameRoutes = require("./gameRoutes");
const studioRoutes = require("./studioRoutes");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} - Request made` });
});

router.use("/games", gameRoutes);
router.use("/studios", studioRoutes);

module.exports = router;
