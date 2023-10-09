# Challanges 

Hey everybody , I would like to introduce this project 
My name is Samandar Jumanov  , Eighteen years old   from Uzbekistan 
# Main goal of project 

It mainly servers as a sharing your problem in your code , Or making hackatons for users by superusers 

Lets explore endpoints and what they serve

# From users controller 

You can make an user and it has Signup and Login endpoints

# Sign up
# url post  https://sharebook-vfil.onrender.com/api/v1/users/sign-up 

# Signup requirements 

username and password 

# Login 
With the same logic and requirements you can login 
# url post https://sharebook-vfil.onrender.com/api/v1/users/login


# Idea after created account 
You should be directed to the account page directly 
# in account page 
 #  url  get https://sharebook-vfil.onrender.com/api/v1/users/user-info/:userId

After there you can go  :

# see all shared problems 
# url  gethttps://sharebook-vfil.onrender.com/api/v1/problems/all

It doesnt require anything from user 

# Or you can create a own problem 
# url posthttps://sharebook-vfil.onrender.com/api/v1/problems/create 

# First of all it requires token from user 

Second requirement is ---(problem, userId )  -- from user 

It basically creates a problem and addes it to user from problem model 


# or you can  :

 # url get https://sharebook-vfil.onrender.com/api/v1/problems/created-problems/:userId

 Get your user  shared problem
It should be fetched on the account page 
# And it requries token too 




---------------------------------Solutions -----------------------------------------
# You can add solutions too for created problems

# The first one is to get your solutions 

 # url get https://sharebook-vfil.onrender.com/api/v1/solutions/shared-solutions/:userId

 It requires userId from params and token 

 
 # And you can get solutions for specific problem 

 # url  gethttps://sharebook-vfil.onrender.com/api/v1/solutions/problem-solutions/:problemId
 
 It requires token 

 # And  you can create solution 
 # url post https://sharebook-vfil.onrender.com/api/v1/solutions/give-solution
 
 It requires token and (solution , problemId , userId   )  

 # And if you need you can get all solutions 
#  url  get https://sharebook-vfil.onrender.com/api/v1/solutions/all-solutions


--------------------Following-------------------

# Follow 
You can follow and you can follow and unfollow  users too 
#  url  post https://sharebook-vfil.onrender.com/api/v1/follows/follow

It requires  userId , followingUserId 

Unfollow url :
 # url  post  https://sharebook-vfil.onrender.com/api/v1/follows/follow 

It requires  userId , followingUserId  




-------------------Role superuser-----------------------


You can change role 

# Before 
You should use payment 
 # urlhttps://sharebook-vfil.onrender.com/change/role/payment
Requirements :
token , userId 

# url https://sharebook-vfil.onrender.com/api/users/change-role
it requires userId  and token from header

# After you changed your role you can post a new hackaton , and  createPosts 

# To create a new hackaton 

 #https://sharebook-vfil.onrender.com/api/v1/admin/hackaton/create-hackaton

Requiements :
userId , problem , problemResult  , hackatonName
and role from headers and token also 

# To create a new post 

Url : 
# https://sharebook-vfil.onrender.com/api/v1/admin/posts/create-post 

Requirements :
 title  , description, userId , code  
 role 
 token 

# also you can share your created post  

# post https://sharebook-vfil.onrender.com/api/v1/problems/created-problems/:userId/api/v1/send-message

 Requirements : userId , recieverUserId  , postId and token 


