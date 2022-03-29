// middleware/auth.js
const jwt = require('jsonwebtoken');

function getCookie(cname, cookie) {
  var name = cname + "=";
  var ca = cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

module.exports = {
  view_is_logged_in: (req, res, next) => {
    try {
      // const token = req.headers.authorization.split(' ')[1];
      const token = getCookie('access_token', req.headers.cookie).split('%20')[1];
      const decoded = jwt.verify(
        token,
        (process.env.JWT_KEY || "GW_TRG")
      );
      req.user_data = decoded;
      if("/login" == req._parsedUrl.pathname)
      {
        res.redirect('/');
      }
      else
      {
        next();
      }
    } 
    catch (err) {
      if("/login" == req._parsedUrl.pathname)
      {
        next();
      }
      else
      {
        next();
      }
    }
  },  
};