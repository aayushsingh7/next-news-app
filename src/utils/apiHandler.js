export async function errorHandler(message , res , code = 400){
    return res.status(code).send({success:false , message:message})
} 


export const validateBody = (fields) => {
    for(let key in fields){
        if(fields[key].trim() === ""){
            throw new Error(`${key} Required`)
        }
    }
}