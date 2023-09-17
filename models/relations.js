const DbUsers = require('./users');
const SharedCode = require('./shareCode');
const ProblemSolutions = require('./problemSolutions');

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

module.exports = { DbUsers, SharedCode, ProblemSolutions };