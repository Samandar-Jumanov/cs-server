const {ShareProblems , SharedSolutions, Users } = require('../models/models');
const sequelize = require('../utils/db');

const getAllSolutions = async (request , response ,  next ) =>{
    try {
        const allSolution =SharedSolutions.findAll()
        response.json({
            allSolution : allSolution
        })
        
    } catch (error) {
        next(error)
        
    }
}

const giveSolution = async (request , response , next ) =>{
    try {

        const {solution , problemId , solverId  , solverName  } = request.body
        let t;
        try {
            t = await sequelize.transaction();
            const problem = await ShareProblems.findByPk(problemId, {transaction :t })
            const newSolution = await SharedSolutions.create({
                solution : solution,
                problemId : problemId ,
                solverId : solverId ,
                solverName : solverName ,
                isTrue : false ,
            } )
            await problem.addSolutions(newSolution, {transaction : t }) 
             await problem.save()

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
    const {userId} = request.params 

    try {

        const user = await Users.findByPk(userId , {
            include : [
                {model : SharedSolutions , as : 'sharedSolutions'}
            ]

        })

        const userSolutions = user.sharedSolutions 

        return response.json({
             solutions : userSolutions
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