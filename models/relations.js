const DbUsers = require('./users');
const SharedCode = require('./shareCode');
const ProblemSolutions = require('./problemSolutions');
const Stars = require('../models/stars')
const GivenStars  = require('./givenStar')


// Define associations
DbUsers.hasMany(SharedCode, {
  foreignKey: 'userId',
  as: 'problems',
});

SharedCode.belongsTo(DbUsers, {
  foreignKey: 'userId',
});

SharedCode.hasMany(ProblemSolutions, {
  foreignKey: 'problemId',
  as: 'problemSolution',
});

ProblemSolutions.belongsTo(SharedCode, {
  foreignKey: 'problemId',
});

DbUsers.hasMany(ProblemSolutions, {
  foreignKey: 'userId',
  as: 'userSolutions',
});

ProblemSolutions.belongsTo(DbUsers, {
  foreignKey: 'userId',
});


//Stars and Users 

Stars.belongsTo(DbUsers, {
  foreignKey :'userId'
})

DbUsers.hasMany(Stars , {
  foreignKey :'userId',
  as :'stars'
})


//Given stars 
GivenStars.belongsTo(DbUsers , {
  foreignKey :'userId',
})

DbUsers.hasMany(GivenStars , {
  foreignKey :'userId',
  as :'givenStars'
})




module.exports = { DbUsers, SharedCode, ProblemSolutions , Stars };