const {DbUsers} = require('../models/relations')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()




const getAllUsers = async (request , response , next ) =>{
    try {
        
        const allUsers = await DbUsers.findAll()
        response.json({
            allUsers : allUsers
        })
    } catch (error) {
        next(error)
    }
}




const Signup = async (request , response , next ) =>{
    try {
        const {username , password  } = request.body 
        const user = await DbUsers.findOne({
            where : {username}
        } )
        
        console.log(user)
        if(user){
            return response.json('User not found ')
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = await DbUsers.create({
            username : username ,
            password : hashedPassword,
            token : process.env.SECRETKEY,
        } )
        
       

        const token = await jwt.sign({userId : newUser.id}, process.env.SECRETKEY)
        newUser.token = token
        await newUser.save()

        return response.status(201).json({
            username : newUser.username,
            userId : newUser.id 
        })
        } catch (error) {
            console.log(error)
            next(error)
    }
}



const Login = async (request , response , next ) =>{
    const {username , password } = request.body 

    try {

        const user = await DbUsers.findOne({
            where : {username}
        })
        
        if(!user){
            return response.json({
                message :'User not  found  '
            })
        }

        const isTruePassword = await bcrypt.compare(password , user.password)

        if(!isTruePassword){
            return response.json({
                message :'Invalid password '
            })
        }
        const newToken = await jwt.sign({userId : user.id}, process.env.SECRETKEY)
        user.token =  newToken
        await user.save()

        return response.status(200).json({
            username: user.username ,
            userId : user.id,
            message :'Logged in succesfully'
        })

    } catch (error) {
            next(error)        
    }
}


const getUserInfo = async (request , response , next ) =>{

    const {userId} = request.params 

    try {
        const user  = await DbUsers.findByPk(userId)
        
        if(!user){
            return response.json({
                message : 'User not found '
            })
        }

        const userMessages = await user.getMessages()
        const  userProblems = await user.getProblems()
        const userSolutions = await user.getUserSolutions()
        const userFollowers = await  user.getFollower()
        const userFollowings = await user.getFollowing()

        const allUsers = await DbUsers.findAll();
        const userFollowed = await user.getFollowing();
  
        let unfollowedUsers = [];
  
        for (let i = 0; i <= allUsers.length - 1; i++) {
        let isFollowed = false;
  
        for (let j = 0; j <= userFollowed.length - 1; j++) {
          if (allUsers[i].id === userFollowed[j].id) {
            isFollowed = true;
            break;
          }
        }
  
        if (!isFollowed) {
          unfollowedUsers.push(allUsers[i]);
        }
      }
        return response.json({
        userMessages : userMessages,
        userProblems : userProblems , 
        userSolutions : userSolutions,
        userFollowers : userFollowers,
        userFollowings : userFollowings,
        unfollowedUsers : unfollowedUsers
        })
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }

}




module.exports ={
    Signup,
    Login ,
    getAllUsers,
    getUserInfo
}