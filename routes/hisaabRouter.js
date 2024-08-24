const express = require("express");
const router = express.Router();
const {
  createHisaabController,
  hisaabPageController,
  readHisaabController,
  deleteController,
  editHisaabController,
  editPostHisaabController,
  readVerifiedHisaabController,
} = require("../controllers/hisaabController");

const { isLoggedIn, redirectToProfile } = require("../middlewares/middleware");

router.get("/create", isLoggedIn, hisaabPageController);
router.post("/create", isLoggedIn, createHisaabController);

router.get("/view/:id", isLoggedIn, readHisaabController);
router.get("/delete/:id", isLoggedIn, deleteController);

router.get("/edit/:id", isLoggedIn, editHisaabController);
router.post('/edit/:id',isLoggedIn,editPostHisaabController);
router.post('/verify/:id', isLoggedIn,  readVerifiedHisaabController )

module.exports = router;
