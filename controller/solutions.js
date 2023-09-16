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
            const user = await DbUsers.findByPk(userId  , {transaction : t })
            
            const newSolution = await ProblemSolutions.create({
                solution : solution,
                problemId : problemId ,
                solverName : solverName ,
                isTrue : false ,
                userId : userId
            } )

            await problem.addSolutions(newSolution, {transaction : t }) 
            await user.addSolutions(newSolution, { transaction : t })
            await problem.save()
            await user.save()

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

        const user = await DbUsers.findByPk(userId ,{
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


const getSpecificProblemSolutions = async (request , response , next ) =>{
    const {problemId} = request.params

    try {
        const problem = await SharedCode.findByPk(problemId , {
            include :[
                {model :ProblemSolutions , as :'solutions'}
            ]
        })

        const problemSolutions = problem.addSolutions
        response.json(
            problemSolutions
        )

        
    } catch (error) {
        nect(error)
        
    }
}

module.exports = {
    giveSolution,
    getAllSolutions,
    getUserSolutions,
    getSpecificProblemSolutions
}

