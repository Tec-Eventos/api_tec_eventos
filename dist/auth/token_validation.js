const{verify:verify}=require("jsonwebtoken");module.exports={checkToken:(e,s,t)=>{let n=e.get("authorization");n.startsWith("Bearer ")&&(n=n.slice(7,n.length)),n?verify(n,process.env.MYSECRET,((e,n)=>{e?s.json({success:0,message:"Invalid token"}):t()})):s.status(401).json({success:0,message:"Access denied! unautorized user"})}};