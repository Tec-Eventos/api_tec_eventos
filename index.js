require("dotenv").config();

const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const imageRouter = require("./routes/imageRoutes");


app.use(express.json());

app.use("/", userRouter);
app.use("/", imageRouter);
app.listen(process.env.APP_PORT, ()=>{
    console.log("Server up and running on PORT: ", process.env.APP_PORT)
});