const { SharedCode, DbUsers } = require('../models/models');
const sequelize = require('../utils/db');

const getAllProblems = async (request, response, next) => {
  try {
    const allProblems = await SharedCode.findAll();
    return response.json({
      allProblems: allProblems
    });
  } catch (error) {
    next(error);
  }
};


const shareProblem = async (request, response, next) => {
  try {
    const { problem, userId , sharedCode  } = request.body;

    const t = await sequelize.transaction();

    try {
      const newProblem = await SharedCode.create(
        { problem  : problem, 
            userId : userId  , 
            sharedCode  : sharedCode },
         { transaction: t });

         

      const user = await DbUsers.findByPk(userId, { transaction: t });
      if (!user) {
        throw new Error('User not found');
      }
      await newProblem.setUser(user, { transaction: t });
      await user.addProblems(newProblem)
      await user.save()

      await t.commit();

      response.json(newProblem);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProblems,
  shareProblem
}