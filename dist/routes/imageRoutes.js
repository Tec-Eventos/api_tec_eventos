const express=require("express"),multer=require("multer"),imageController=require("../controllers/imageController"),path=require("path"),router=express.Router(),storage=multer.diskStorage({destination:"./tmp/uploads/",filename:(e,r,o)=>{o(null,`${r.fieldname}_${Date.now()}${path.extname(r.originalname)}`)}}),upload=multer({storage:storage});router.post("/upload",upload.single("imagem"),imageController.uploadImage),router.get("/imagem/:arquivo",imageController.viewImage),router.get("/imagem/evento/:cd_evento",imageController.getImagesForEvent),module.exports=router;