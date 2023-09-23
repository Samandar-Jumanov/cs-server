const {DbUsers, UserFollowers , UserFollowings} = require("../models/relations");
const sequelize = require("../utils/db");

const Followers = async (request , response , next ) =>{

    const {userId , followingUserId  } = request.body

    let t ;
    try {
        t = await sequelize.transaction();
        const user = await DbUsers.findByPk(userId)
        const followingUser= await DbUsers.findByPk(followingUserId)

        if(!user || !followingUser){
            return response.json({
                message :'User not found '
            })
        }

        const newFollowing = await UserFollowings.create({
            userId : userId , 
            addedUserId : followingUserId ,
            addedUsername : followingUser.username 
             
        } , {transaction: t })

       await  user.addFollowing(newFollowing , {transaction: t })

      const newFollower =   await UserFollowers.create({
            userId : followingUserId, 
            addedUserId : userId,
            addedUsername : user.username 
        } , { transaction : t })
       
       await followingUser.addFollower(newFollower , { transaction : t })
       
       return response.json({
        message :'Followed succesfully'
       })
    } catch (error) {
        console.log(error)
        await t.rollback()
        next(error)
    }
}

const unfollowedUsers = async (request, response, next) => {
    const { userId } = request.params;
    try {
      const user = await DbUsers.findByPk(userId);
  
      if (!user) {
        return response.json({
          message: 'User not found',
        });
      }
  
      const allUsers = await DbUsers.findAll();
      const userFollowed = await user.getFollowing();
  
      let unfollowedUsers = [];
  
      for (let i = 0; i <= allUsers.length - 1; i++) {
        let isFollowed = false;
  
        for (let j = 0; j <= userFollowed.length - 1; j++) {
          if (allUsers[i].id === userFollowed[j].id) {
            isFollowed = true;
            break;
          }
        }
  
        if (!isFollowed) {
          unfollowedUsers.push(allUsers[i]);
        }
      }
  
      return response.json({
        unfollowedUsers: unfollowedUsers,
      });
    } catch (error) {
      next(error);
    }
  };
  
module.exports = {
    Followers,
    unfollowedUsers
}



