const{Router:Router}=require("express"),router=require("express").Router(),{getListaPresenca:getListaPresenca}=require("../controllers/listaPresencaController");router.get("/listaPresenca/:cd_evento",getListaPresenca),module.exports=router;