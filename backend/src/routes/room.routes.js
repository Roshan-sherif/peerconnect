const express = require("express");
const { createRoomController, joinRoomController,getRoomUserController } = require("../controllers/room.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.post('/create',authMiddleware, createRoomController)
router.post('/join',authMiddleware,joinRoomController)
router.post('/members',authMiddleware,getRoomUserController)
module.exports=router