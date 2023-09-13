const {Users} = require('./users')
const {SharedProblems} = require('./problems')
const {Solutions} = require('./solutions')
const {SentSolutions} = require('./sent-solutions')
const { RecievedSolutions} = require('./recieved-solutions')



Users.hasMany(SharedProblems, { foreignKey: 'userId' ,  as :'sharedProblems' });
SharedProblems.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(SentSolutions , { foreignKey :'userId' , as :'sentSolutions'})
SentSolutions.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(RecievedSolutions , {foreignKey :'userId', as :'recievedSolutions'})
RecievedSolutions.belongsTo(Users, { foreignKey: 'userId' });

SharedProblems.hasMany(Solutions, { foreignKey: ['problemId' , 'userId']  ,  as :'solutions'});
Solutions.belongsTo(SharedProblems, { foreignKey: ['problemId' , 'userId'] });

