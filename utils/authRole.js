const authRole = () => (req, res, next) => {
    const { role } = req.headers;
  
    if (!role || role.toLowerCase() !== 'superuser') {
      return res.status(403).json({
        message: 'Super user  role required',
      });
    }
  
    next();
  };
  
  module.exports = {authRole};