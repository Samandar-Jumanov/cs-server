const {DbUsers , SharedCode}= require('../models/relations')
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
    const { problem, userId   } = request.body;

    const t = await sequelize.transaction();

    try {
      const newProblem = await SharedCode.create(
        { problem  : problem, 
          userId : userId  },
         { transaction: t });

      const user = await DbUsers.findByPk(userId, { transaction: t });
      if (!user) {
        throw new Error('User not found');
      }
      await user.addProblems(newProblem  , {transaction : t })
      await user.save()
      await t.commit();
      return  response.json(newProblem);
    } catch (error) {
      await t.rollback();
       next(error)
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Internal server error' });
    next(error)
  }
};


const getUserCreatedProblems = async (request , response , next ) =>{

  const {userId} = request.params

  try {
    const user = await DbUsers.findByPk(userId , {
      include :[
        {model : SharedCode , as :'problems'}
      ]
    })

    const userSharedCode = user.problems
    

    return response.json({
      userSharedCode : userSharedCode
    })
  } catch (error) {
   next(error)
  }
}

module.exports = {
  getAllProblems,
  shareProblem,
  getUserCreatedProblems
}