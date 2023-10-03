const {DbUsers} = require('../models/relations')


const createHackaton = async (request , response , next  ) =>{
    const {userId , problem , result , hackatonName, selectedUsers } = request.body 
    try {
 
        const user = await DbUsers.findByPk(userId)
        
        if (!user){
            return response.json({
                message :'User not found '
            })
        }
     
      

    } catch (error) {
        
    }
   




}
