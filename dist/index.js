require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');

const userRouter = require("./routes/userRoutes");
const imageRouter = require("./routes/imageRoutes");
const schoolRouter = require("./routes/schoolRoutes");
const eventRouter = require("./routes/eventRoutes");
const enderecoRouter = require("./routes/enderecoRoutes");
const qrcodeRouter = require("./routes/qrcodeRoutes");
const tipoIngressoRouter = require("./routes/tipoIngressoRoutes");
const listaPresencaRouter = require("./routes/listaPresencaRoutes");
const imageUserRouter = require("./routes/imageUserRoutes");
app.use(express.json());
app.use(express.static(path.join(__dirname, './tmp/uploads')));


app.use("/", qrcodeRouter);
app.use("/", eventRouter);
app.use("/", userRouter);
app.use("/", imageRouter);
app.use("/", enderecoRouter);
app.use("/", schoolRouter);
app.use("/", tipoIngressoRouter);
app.use("/", listaPresencaRouter);
app.use("/", imageUserRouter);

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server up and running on PORT: ", process.env.APP_PORT)
});