const DbUsers = require('./users');
const SharedCode = require('./shareCode');
const ProblemSolutions = require('./problemSolutions');
const Stars = require('./stars')
const { UserFollowers ,UserFollowings } = require('./follow');
const { Messages } = require('./Messages');



SharedCode.belongsTo(DbUsers, {
  foreignKey: 'userId',
});

DbUsers.hasMany(SharedCode, {
  foreignKey: 'userId',
  as: 'problems',
});

ProblemSolutions.belongsTo(SharedCode, {
  foreignKey: 'problemId',
});

SharedCode.hasMany(ProblemSolutions, {
  foreignKey: 'problemId',
  as: 'problemSolution',
});

ProblemSolutions.belongsTo(DbUsers, {
  foreignKey: 'userId',
});

DbUsers.hasMany(ProblemSolutions, {
  foreignKey: 'userId',
  as: 'userSolutions',
});



//Users and follow 

UserFollowers.belongsTo(DbUsers , {
  foreignKey :'userId'
})

DbUsers.hasMany(UserFollowers , {
  foreignKey :'userId', as :'follower'
})

UserFollowings.belongsTo(DbUsers , {
  foreignKey :'userId'
})

DbUsers.hasMany(UserFollowings, {
  foreignKey :'userId', 
  as :'following'
})



//Messages and Users 

Messages.belongsTo(DbUsers , {
  foreignKey :'userId'
})
DbUsers.hasMany(Messages , {
  foreignKey :'userId', 
  as :'messages'
})

module.exports = { DbUsers, 
  SharedCode, 
  ProblemSolutions , 
  Stars ,
  UserFollowings , 
  UserFollowers ,
  Messages };