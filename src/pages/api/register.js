import dbConnect from "@/database/dbConnection";
import User from "@/database/models/userModel";
import { errorHandler  , validateBody} from "@/utils/apiHandler";
import bcryptjs from 'bcryptjs'
    

export default async function handler(req,res){
    if(req.method !== "POST") return res.status(200).send({success:false,message:"Method Not Allowed"})
    
 try{
    await dbConnect().catch((err)=> console.log(err))
    const {name,email,password} = req.body;
    validateBody(req.body)

    const isUserExists = await User.findOne({email:email})
    if(isUserExists) return res.status(200).send({success:false, message:"User already exists"})

    const hashPassword = await bcryptjs.hash(password,12)
    
    let createUser = new User({
        name:name,
        email:email,
        password:hashPassword
    })

    await createUser.save()
   
    if(!createUser._id) {return res.status(400).send({success:false , message:"Something went wrong while registering user"})}
    else{res.status(200).send({success:false , message:"User Registered Successfully",NewUser:createUser})}

    } catch(err){
    res.status(500).send(err.message)
    }
}

