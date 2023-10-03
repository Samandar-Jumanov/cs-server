const authRole = () => (req, res, next) => {
    const { role } = req.headers;
  
    if (!role || role.toLowerCase() !== 'mentor') {
      return res.status(403).json({
        message: 'Mentor role required',
      });
    }
  
    next();
  };
  
  module.exports = {authRole};