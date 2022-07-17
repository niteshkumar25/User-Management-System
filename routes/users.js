const router = require("express").Router();
const userCtrl = require("../controller/userCtrl");

// router.get("", (req, res) => {
//     res.render("home");
//   });

router.get("/", userCtrl.homePage);
router.post("/", userCtrl.find);
router.get("/adduser", userCtrl.form);
router.post("/adduser", userCtrl.adduser);
router.get("/edituser/:id", userCtrl.edit);
router.post("/edituser/:id", userCtrl.editsUser);
router.get("/:id", userCtrl.delete);
router.get("/viewuser/:id", userCtrl.viewUser);
module.exports = router;
