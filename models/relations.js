const DbUsers = require('./users');
const SharedCode = require('./shareCode');
const ProblemSolutions = require('./problemSolutions');
const Stars = require('../models/stars')
const GivenStars  = require('./givenStar');
const { UserFollowers ,UserFollowings } = require('./follow');



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



module.exports = { DbUsers, SharedCode, ProblemSolutions , Stars , Followers , FollowingUsers };