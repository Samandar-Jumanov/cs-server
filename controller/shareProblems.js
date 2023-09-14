const {ShareProblems, Users} = require('../models/models');
const sequelize = require('../utils/db');


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
        })


       await user.addProblems(newProblem)
       await user.save()



        return response.json({message :"Creating succeded", newProblem : newProblem})
        
    } catch (error) {
        
    }
}

module.exports ={
    shareProblem
}