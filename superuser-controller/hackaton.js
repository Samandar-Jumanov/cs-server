const {DbUsers, Hackatons} = require('../models/relations');
const sequelize = require('../utils/db');


const createHackaton = async (request , response , next  ) =>{
    const {userId , problem , problemResult  , hackatonName } = request.body 
    let t ;
    try {
        t = await sequelize.transaction();
        const user = await DbUsers.findByPk(userId)
        if (!user){
            return response.json({
                message :'User not found '
            })
        }
       
        const newHackaton = await Hackatons.create({
            userId : userId ,
            hackatonName : hackatonName,
            hackatonProblem : problem ,
            hackatonResult : problemResult 
        } , { transaction : t })

        await user.addHackatons(newHackaton , { transaction : t })
        await user.save()
        await t.commit();
        response.json({
            message :' Created succefully'
        })
    } catch (error) {
        console.log(error)
        await t.rollback();
        next(error)
    }
}

module.exports ={
    createHackaton
}


