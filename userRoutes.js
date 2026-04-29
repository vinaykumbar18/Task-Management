const express = require("express");
const router = express.Router();

const {
   createUser,
   deleteUser,
   updateUser
} = require("../controllers/userController");

router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);

module.exports = router;