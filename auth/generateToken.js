import jwt from "jsonwebtoken"

const generateToken=(user)=>{
    return jwt.sign({user:user._id},
        process.env.JWT_PRIVATE_KEY,
        {expiresIn:"3d"}
    )
}

export default generateToken