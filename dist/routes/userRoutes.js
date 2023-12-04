const{Router:Router}=require("express"),{createUser:createUser,getUserById:getUserById,getUsers:getUsers,updateUser:updateUser,deleteUser:deleteUser,getAllEventsUser:getAllEventsUser,login:login}=require("../controllers/userController"),router=require("express").Router(),{checkToken:checkToken}=require("../auth/token_validation");router.post("/aluno",createUser),router.get("/aluno",getUsers),router.get("/aluno/:rm_aluno",getAllEventsUser),router.get("/:rm_aluno",checkToken,getUserById),router.patch("/:rm_aluno",checkToken,updateUser),router.delete("/:rm_aluno",checkToken,deleteUser),router.post("/loginAluno",login),module.exports=router;