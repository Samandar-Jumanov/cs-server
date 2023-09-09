const {Users, SharedProblems}   = require('../models/models')
const sequelize = require("../utils/db")



const getAllProblems = async (request , res , next ) =>{
    try {
        const allProblems = await SharedProblems.findAll()
        return res.json({
            allProblems
        })
    } catch (error) {
        next(error)
        
    }
}


const shareProblem = async (req, res , next ) =>{
    const {problem , username, code } = req.body 
    let transaction;

    try {
        transaction = await sequelize.transaction()
        const user = await Users.findOne({
             where : { username }
        }, {transaction})
        if(!user){
            return res.json({
                message :'User not found '

            }), {transaction}
        }
        const newProblem = await SharedProblems.create({
            problem : problem,
            problemCreator :username,
            isSolved : false ,
            code : code 
        }, {transaction})

        await user.addSharedProblems(newProblem)
        await transaction.commit()
        return res.json({
            newProblem
        })
    } catch (error) {
        // if(error) await transaction.rollback();
        next(error)
        
    }
}

const getUserSharedProblems = async (req , res , next ) =>{
    const {userId} = req.params 

    try {
        const user = await Users.findByPk(userId , {
             include :[
                {model : SharedProblems , as :'sharedProblems'}
             ]
        })

        if(!user){
             return res.json({
                message :'User not found '
             })
        }

        const userSharedProblems = user.sharedProblems

        return res.json({
            userSharedProblems
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports ={
    shareProblem, 
    getUserSharedProblems,
    getAllProblems
}