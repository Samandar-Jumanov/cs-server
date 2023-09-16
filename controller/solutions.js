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

        const {solution , problemId , userId  , solverName  } = request.body
        let t;
        try {
            t = await sequelize.transaction();
            const problem = await SharedCode.findByPk(problemId, {transaction :t })
            const newSolution = await ProblemSolutions.create({
                solution : solution,
                problemId : problemId ,
                solverName : solverName ,
                isTrue : false ,
                userId : userId
            } )

            const user = await DbUsers.findByPk(userId )
            await problem.addSolutions(newSolution, {transaction : t }) 
             await problem.save()
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
        
      

        // const allUserSolutions = user.solutions 

        console.log(user)
        
        return response.json({
            allUserSolutions : user
            
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

