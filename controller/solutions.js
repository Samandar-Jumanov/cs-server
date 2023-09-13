const sequelize = require("../utils/db");
const {Users } = require('../models/users')
const {SharedProblems} = require('../models/problems')
const {Solutions} = require('../models/solutions')
const  giveSolutions = async (req, res, next) => {
    const { userId, problemCreator, solution, problemId } = req.body;
  
    let transaction;
  
    try {
      transaction = await sequelize.transaction();
      const senderUser = await Users.findByPk(userId);
      const recieverUser = await Users.findOne( {
        where : {problemCreator}
      });

      const problem = await SharedProblems.findByPk(problemId);
  
      if (!senderUser || !recieverUser || !problem) {
        throw new Error('User or problem not found');
      }
  
      const newSolution = await Solutions.create({
        solution: solution,
        solverName: senderUser.username,
        isTrue: false,
        problem: problem.problem,
      });
  
      await senderUser.addSentSolutions({
        solutionRecieverUsername: recieverUser.username,
        solution: newSolution.solution,
        problem: problem.problem,
      });
  
      await recieverUser.addRecievedSolutions({
        solutionSentUsername: senderUser.username,
        problem: problem.problem,
        solution: solution,
      });
  
      await problem.addSolutions(newSolution);
  
      await senderUser.save();
      await recieverUser.save();
      await problem.save();
      await transaction.commit();
  
      res.json({
        message: 'Created successfully',
        newSolution,
      });
    } catch (err) {
      if (transaction) await transaction.rollback();
      next(err);
    }
  };
  
  module.exports = {
    giveSolutions,
  };