const{Router:Router}=require("express"),{createEndereco:createEndereco,updateEndereco:updateEndereco,deleteEndereco:deleteEndereco}=require("../controllers/enderecoController"),router=require("express").Router();router.post("/endereco",createEndereco),router.patch("/endereco/:cep",updateEndereco),router.delete("/endereco/:cep",deleteEndereco),module.exports=router;