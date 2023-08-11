const express = require("express");
const {
    registerUser,
    authUser,
    addSubscription,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/subscribe", addSubscription);

module.exports = router;
