

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  },
  authRole(role){
    return (req,res,next)=>{
        if(req.user.role !== role ) {
            res.status(401)
            console.log(req.user.role)
            return res.send("not allowed")   
        }
        next();
    }
}
};
