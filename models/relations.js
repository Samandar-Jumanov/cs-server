const Users = require('./users')
const  SharedProblems = require('./sharedProblems')

Users.hasMany(SharedProblems , {
    as :'sharedProblems'
})
SharedProblems.belongsTo(Users)



module.exports = {
    Users,
    SharedProblems
}