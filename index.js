require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes");
const imageRouter = require("./routes/imageRoutes");
const schoolRouter = require("./routes/schoolRoutes");
const eventRouter = require("./routes/eventRoutes");
const qrcodeRouter = require("./routes/qrcodeRoutes");

app.use(express.json());

app.use("/", qrcodeRouter);
app.use("/", eventRouter);
app.use("/", userRouter);
app.use("/", imageRouter);
app.use("/", schoolRouter);
app.listen(process.env.APP_PORT, ()=>{
    console.log("Server up and running on PORT: ", process.env.APP_PORT)
});