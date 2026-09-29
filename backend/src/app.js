const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const authRoutes=require('./routes/auth.routes')
const roomRoutes=require('./routes/room.routes')
const { room } = require("./config/prisma");
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/room',roomRoutes)


module.exports = app;