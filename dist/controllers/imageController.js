const imageService=require("../services/imageService"),path=require("path"),uploadImage=async(e,a,o)=>{try{console.log("Chamada para uploadImage");const{cd_evento:o,principal:s,logo_evento:r}=e.body,i=e.file.filename;if(console.log("Campos recebidos:",{cd_evento:o,imageName:i,principal:s,logo_evento:r}),!(o&&i&&s&&r))throw console.error("Erro: Campos faltando na requisição."),new Error("Missing required data for image upload");await imageService.uploadImageToDatabase(o,i,s,r),console.log("Imagem enviada com sucesso."),a.status(200).json({message:`Successfully created image with cd_evento: ${o}`})}catch(e){console.error("Erro durante o processo:",e.message),o(e)}},viewImage=(e,a,o)=>{try{const o=e.params.arquivo;a.sendFile(path.join(__dirname,`../tmp/uploads/${o}`))}catch(e){console.error("Erro ao visualizar imagem:",e.message),o(e)}};module.exports={uploadImage:uploadImage,viewImage:viewImage,getImagesForEvent:(e,a)=>{const o=e.params.cd_evento;imageService.getImagesForEvent(o,((e,o)=>{if(!e)return o?a.json({success:1,data:o}):a.json({success:0,message:"Record not found"});console.log(e)}))}};