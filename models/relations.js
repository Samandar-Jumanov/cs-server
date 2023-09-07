const Users = require('./users')
const  SharedProblems = require('./sharedProblems')
const { SentSolutions, RecievedSolutions, Solutions } = require('./solutions')

Users.hasMany(SharedProblems , {
    as :'sharedProblems'
})
SharedProblems.belongsTo(Users)

//Sent solutions and users 
Users.hasMany(SentSolutions , {
     as :'sentSolutions'
})
SentSolutions.belongsTo(Users)

//Recieved Solutions 

Users.hasMany(RecievedSolutions,{
     as :'recievedSolutions'
})
RecievedSolutions.belongsTo(Users)

//Problems and Solutions 

SharedProblems.hasMany(Solutions, {
     as :'solutions'
})
Solutions.belongsTo(SharedProblems)

module.exports = {
    Users,
    SharedProblems
}