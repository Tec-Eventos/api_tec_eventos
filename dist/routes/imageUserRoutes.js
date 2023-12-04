const express=require("express"),multer=require("multer"),imageUserController=require("../controllers/imageUserController"),path=require("path"),router=express.Router(),storage=multer.diskStorage({destination:"./dist/tmp/uploadsUsers/",filename:(e,r,o)=>{o(null,`${r.fieldname}_${Date.now()}${path.extname(r.originalname)}`)}}),upload=multer({storage:storage});router.post("/uploadUser",upload.single("imagem"),imageUserController.uploadImage),module.exports=router;