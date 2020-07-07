
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'No has iniciado sesion.');
  res.redirect('/usuario/login');
};

helpers.isNotAuthenticated =(req,res,next)=>{
	if (!req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/profile');
}; 
module.exports = helpers;