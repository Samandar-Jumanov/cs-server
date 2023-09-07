const {Users , SharedProblems} = require('./users')

Users.hasMany(SharedProblems , {
    as :'sharedProblems'
})
SharedProblems.belongsTo(Users)



module.exports = {
    Users,
    SharedProblems
}