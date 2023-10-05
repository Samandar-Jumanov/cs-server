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

        const newFollower =   await UserFollowers.create({
            userId : followingUserId, 
            addedUserId : userId,
            addedUsername : user.username 
        } , { transaction : t })


       await  user.addFollowing(newFollowing , {transaction: t })
       await followingUser.addFollower(newFollower , { transaction : t })
       await user.save()
       await followingUser.save()
       await t.commit()
       
       return response.json({
        message :'Followed succesfully'
       })
    } catch (error) {
        console.log(error)
        await t.rollback()
        next(error)
    }
}


const unFollow = async (request, response, next) => {
  const { userId, followingUserId } = request.body;

  let t;
  try {
    t = await sequelize.transaction();
    const user = await DbUsers.findByPk(userId);
    const followingUser = await DbUsers.findByPk(followingUserId);

    if (!user || !followingUser) {
      return response.json({
        message: 'User not found',
      });
    }

    const followingToUnfollow = await UserFollowings.findOne({
      where: {
        userId: userId,
        addedUserId: followingUserId,
      },
    });

    const followerToUnfollow = await UserFollowers.findOne({
      where: {
        userId: followingUserId,
        addedUserId: userId,
      },
    });

    if (!followingToUnfollow || !followerToUnfollow) {
      return response.json({
        message: 'User is not followed',
      });
    }

    await followingToUnfollow.destroy({ transaction: t });
    await followerToUnfollow.destroy({ transaction: t });
    await user.save();
    await followingUser.save();
    await t.commit();

    return response.json({
      message: 'Unfollowed successfully',
    });
    
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(error);
  }
};

module.exports = {
  Followers,
  unFollow,
};




