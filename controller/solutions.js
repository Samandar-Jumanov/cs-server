const {SharedCode , ProblemSolutions, DbUsers } = require('../models/models');
const sequelize = require('../utils/db');

const getAllSolutions = async (request , response ,  next ) =>{
    try {
        const allSolution = ProblemSolutions.findAll()
        
        response.json({
            allSolution : allSolution
        })
        
    } catch (error) {
        next(error)
        
    }
}



const giveSolution = async (request , response , next ) =>{
    try {

        const {solution , problemId , solverId  , solverName  , userId } = request.body
        let t;
        try {
            t = await sequelize.transaction();
            const problem = await SharedCode.findByPk(problemId, {transaction :t })
            const newSolution = await ProblemSolutions.create({
                solution : solution,
                problemId : problemId ,
                solverId : solverId ,
                solverName : solverName ,
                isTrue : false ,
            } )
            const user = await DbUsers.findByPk(userId )
            await problem.addSolutions(newSolution, {transaction : t }) 
             await problem.save()

             if(user){
                return response.json({message :'User not found'})
            }
            await user.addSolutions(newSolution, { transaction : t })

            await  t.commit()
            response.json({
                message :'Solution posted ',
                newSolution : newSolution
            })
        } catch (error) {
            await t.rollback()
            console.log(error)
            next(error)
            
        }
    } catch (error) {
        response.json({
            message :'Internal server error',
            error : error
        })
        
    }
}


const getUserSolutions = async (request , response , next ) =>{
    const {userId } = request.body 

    try {

        const user = await DbUsers.findByPk(userId , {
            include :[
                {model : ProblemSolutions , as :'solutions'}
            ]
        })
        
        if(!user)  return response.json({message :'User not found'})

        const allUserSolutions = user.solutions 
        return response.json({
            allUserSolutions : allUserSolutions
            
        })

    } catch (error) {
        next(error)
        
    }
}

module.exports = {
    giveSolution,
    getAllSolutions,
    getUserSolutions
}

