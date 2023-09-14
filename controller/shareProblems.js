const {ShareProblems, Users} = require('../models/models');
const sequelize = require('../utils/db');



const getAllProblems = async (request , response , next ) =>{
    try {
        const allProblems = await ShareProblems.findAll()
        return response.json({
            allProblems : allProblems
        })
    } catch (error) {
        next(error)
    }
}



const shareProblem = async (request , response , next ) =>{
    const {userId , problem  , code} = request.body 

    let transaction;
    try {

        transaction = await sequelize.transaction()
        
        const user = await Users.findByPk(userId)

        if(!user){
            return response.json('User not found')
        }
        
        const existingProblem = await ShareProblems.findOne({
            where : {problem}
        })
        
        if(existingProblem){
            return response.json('Problem is already there ')
        }

        const newProblem = await ShareProblems.create({
            userId : userId,
            problem : problem,
            isSolved : false ,
            code : code  
        }, {transaction})


       await user.addProblems(newProblem , {transaction})
       console.log(user.problems)
       await user.save()
       await transaction.commit()

        return response.json({message :"Creating succeded", newProblem : newProblem})
        
    } catch (error) {
        await transaction.rollback();
        next(error)
        
    }
}

module.exports ={
    shareProblem,
    getAllProblems
}