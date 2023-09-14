const {ShareProblems , Solutions } = require('../models/models');
const sequelize = require('../utils/db');



const giveSolution = async (request , response , next ) =>{
    try {

        const {solution , problemId , solverId } = request.body


        let t;
        try {
            t = await sequelize.transaction();
            const problem = await ShareProblems.findByPk(problemId, {transaction :t })

            const newSolution = await Solutions.create({
                solution : solution,
                problemId : problemId ,
                solverId : solverId 
            } )


            await problem.addSolutions(newSolution, {transaction : t }) 

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
    giveSolution
}