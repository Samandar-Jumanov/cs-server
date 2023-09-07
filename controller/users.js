const { Users } = require("../models/users")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Signup = async (req , res , next) =>{
    const {username , password } = req.body 

    try {
        
        const existingUser = await Users.findOne({
             where : {username}
        })

        if(existingUser){
            return res.json({message :'User has already account'})
        }

        const hashedPassword =   await bcrypt.hash(password , 10)

        const newUser = await Users.create({
            username : username , 
            password : hashedPassword 
        })

        const token = jwt.sign({userid : newUser.id },  process.env.SECRETKEY)
        newUser.token = await token
        await newUser.save()

        return  res.json({
            token ,
            message :'Created'
        })

    } catch (error) {
        next(error)
        
    }

    
}


const Login = async (req, res , next ) =>{
    const {username , password } = req.body 

    try {
        const existingUser = await Users.findOne({
             where : {username}
        })

        if(!existingUser){
            return res.json({
                message :'User not found '
            })
        }
    
        const isValidPassword = await bcrypt.compare(password , existingUser.password)

        if(!isValidPassword){
            return res.json({
                message :'Invalid password '
            })
        }

        const  token = jwt.sign({userId : existingUser.id }, process.env.SECRETKEY)
        existingUser.token = token 
        await  existingUser.save()
    } catch (error) {
        next(error)
    }
}



module.exports = {Signup , Login}
