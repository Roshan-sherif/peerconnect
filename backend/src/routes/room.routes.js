const express = require("express");
const { createRoomController, joinRoomController } = require("../controllers/room.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.post('/create',authMiddleware, createRoomController)
router.post('/join',authMiddleware,joinRoomController)
module.exports=router