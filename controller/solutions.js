const SharedProblems = require("../models/sharedProblems");
const { Solutions } = require("../models/solutions");
const Users = require("../models/users");
const sequelize = require("../utils/db");


const giveSolutions = async (req, res , next ) =>{
    const {userId , recieverUserId , solution , problemId } = req.body 

    let transaction;

    try{
        transaction = await sequelize.transaction();
        const senderUser = await Users.findByPk(userId)
        const recieverUser = await Users.findByPk(recieverUserId)
        const problem = await SharedProblems.findByPk(problemId)

        const newSolution = await Solutions.create({
            solution : solution,
            solverName : senderUser.username ,
            isTrue : false ,
            problemId : problemId 
        })

        await  senderUser.addSentSolutions({
            solutionRecieverUsername: recieverUser.username,
            solution : newSolution.solution,
            problem: problem.problem
        })
            
        await recieverUser.addRecievedSolutions({
            solutionSentUsername: senderUser.username,
            problem : problem.problem , 
            solution : solution
        })
        await senderUser.save()
        await recieverUser.save()

        res.json({
            message :'Created succefully',
            newSolution
        })

    }catch(err){
        if(err) return transaction.rollback();
        next(err)
    }
}

module.exports = {
    giveSolutions
}