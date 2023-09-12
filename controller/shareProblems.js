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
  const { problem, problemCreator, isSolved, code, userId } = req.body;
  let transaction ;

  try {
    transaction = await sequelize.transaction();
    // Create the new problem
    

    // Find the user and associate the new problem
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const newProblem =  await user.addSharedProblems({
      problem: problem,
      problemCreator: problemCreator,
      isSolved: isSolved,
      code: code,
      userId: userId
    } , {transaction}) ;

      await SharedProblems.create({
        problem: problem,
        problemCreator: problemCreator,
        isSolved: isSolved,
        code: code,
        userId: userId
      } , {transaction})

    return res.status(201).json({
      message: "Problem created and associated with the user",
      newProblem: newProblem
    });
  } catch (error) {
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

        console.log('Created ')
        return res.json({
            userSharedProblems
        })
    } catch (error) {
      console.log(error)
        next(error)
    }
}

module.exports = {
    shareProblem,
    getUserSharedProblems,
    getAllProblems
}