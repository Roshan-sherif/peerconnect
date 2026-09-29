const express = require("express");
const { createRoomController } = require("../controllers/room.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.post('/create',authMiddleware, createRoomController)

module.exports=router