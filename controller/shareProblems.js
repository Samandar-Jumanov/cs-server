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

    try {
        const { problem, code, userId } = request.body;
    
        const t = await sequelize.transaction();
    
        try {
          const newProblem = await ShareProblems.create({ problem, code, userId }, { transaction: t });
    
          const user = await Users.findByPk(userId, { transaction: t });
          if (!user) {
            throw new Error('User not found');
          }
          await newProblem.setUser(user, { transaction: t });
    
          await t.commit();
    
          response.json(newProblem);
        } catch (error) {
          await t.rollback();
          throw error;
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

module.exports ={
    getAllProblems, 
    shareProblem
}