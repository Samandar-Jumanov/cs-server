const {Users, ShareProblems} = require('../models/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sequelize = require('../utils/db')
require('dotenv').config()



const Signup = async (request , response , next ) =>{
   
    let t;
    try {
        const {username , password } = request.body 

        t =  await sequelize.transaction();
        const user = await Users.findOne({
            where : {username}
        } , {transaction : t })
        
        if(user){
            return response.json('User not found ')
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = await Users.create({
            username : username ,
            password : hashedPassword,
            token : process.env.SECRETKEY
        } , {transaction : t} )
        
       

        const token = await jwt.sign({userId : newUser.id}, process.env.SECRETKEY)
        newUser.token = token
        await newUser.save()
        await t.commit();

        return response.json({
            user : newUser
        })


        } catch (error) {
            await t.rollback()
            next(error)
        
    }
}


const Login = async (request , response , next ) =>{
    const {username , password } = request.body 

    try {

        const user = await Users.findOne({
            where : {username}
        })
        
        if(!user){
            return response.json(
            'User not found'
            )
        }

        const isTruePassword = await bcrypt.compare(password , user.password)

        if(isTruePassword){
            return response.json('Invalid password ')
        }
        const newToken = await jwt.sign({userId : user.id}, process.env.SECRETKEY)
        user.token = await newToken
        await user.save()
        return response.json({
            user : user 
        })

    } catch (error) {
            next(error)        
    }
}



const getUserAllProblems = async (request , response , next ) =>{
    const {userId} = request.params 
    try {
        
        const user = await Users.findByPk(userId , {
            include : [
                {model : ShareProblems , as :'problems'}
            ]
        })

        const userSharedProblems = user.problems 
        return response.json({
            userSharedProblems : userSharedProblems
        })
    } catch (error) {
        next(error)
        
    }
}

module.exports ={
    Signup,
    Login ,
    getUserAllProblems
}