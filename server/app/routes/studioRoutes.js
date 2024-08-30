const router = require('express').Router();
const {
  getAllStudios,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio
} = require('../controllers/studioController');

router.get("/", getAllStudios);
router.get("/:id", getStudioById);
router.post("/", createStudio);
router.put("/:id", updateStudio);
router.delete("/:id", deleteStudio);

module.exports = router;