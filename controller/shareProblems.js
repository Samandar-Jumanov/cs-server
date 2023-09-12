const {Users}   = require('../models/users')
const sequelize = require("../utils/db")
const {SharedProblems} = require('../models/problems')



const getAllProblems = async (request , res , next ) =>{
    try {
        const allProblems = await SharedProblems.findAll()
        return res.json({
            allProblems
        })
    } catch (error) {
        next(error)
        
    }
}

const shareProblem = async (req, res, next) => {
  const { problem, userId, code } = req.body;
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const user = await Users.findByPk(userId, { transaction });

    if (!user) {
       return  res.status(404).json({
        message :" User not found "
       })
    }

    const newProblem = await SharedProblems.create(
      {
        problem: problem,
        problemCreator: user.username,
        isSolved: false,
        code: code,
        userId: user.id,
      },
      { transaction }
    );

    await user.addSharedProblems(newProblem, { transaction });
    await user.save()
    await transaction.commit();

    return res.json({
      newProblem,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    next(error);
  }
};


  const getUserSharedProblems = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const user = await Users.findByPk(userId, {
            include: [
                { model: SharedProblems, as: 'sharedProblems' }
            ]
        })

        if (!user) {
            return res.json({
                message: 'User not found'
            })
        }

        const userSharedProblems = user.sharedProblems

        return res.json({
            userSharedProblems
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    shareProblem,
    getUserSharedProblems,
    getAllProblems
}