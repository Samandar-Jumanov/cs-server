const {SharedCode , ProblemSolutions } = require('../models/models');
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

        const {solution , problemId , solverId  , solverName  } = request.body
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



module.exports = {
    giveSolution,
    getAllSolutions,
}