const pool=require("../config/database");module.exports={create:(e,a)=>{pool.query("INSERT INTO participantes_evento(cd_evento_realizado, rm_aluno_participante)\n            VALUES(?, ?)",[e.cd_evento_realizado,e.rm_aluno_participante],((e,o,t)=>e?a(e):a(null,o)))}};