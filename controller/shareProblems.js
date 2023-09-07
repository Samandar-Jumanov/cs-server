const {Users , SharedProblems } = require('../models/users')
const sequelize = require("../utils/db")


const shareProblem = async (req, res , next ) =>{
    const {problem , userId} = req.body 
    let transaction;

    try {
        transaction = await sequelize.transaction()
        const user = await Users.findOne(userId, {transaction})
        if(!user){
            return res.json({
                message :'User not found '

            }), {transaction}
        }
        const newProblem = await SharedProblems.create({
            problem : problem,
            problemCreator : user.username,
            isSolved : false 
        }, {transaction})

        await user.addSharedProblems(newProblem)
        await transaction.commit()
        return res.json({
            newProblem
        })
    } catch (error) {
        if(error) return transaction.rollback();
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
    getUserSharedProblems
}