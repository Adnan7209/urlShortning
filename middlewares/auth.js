const { getUser } = require("../services/auth");

const checkForAuthentication = (req, res, next) => {
  //   const authorizationHeaderValue = req.headers["authorization"];

  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  next();
};

const restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("unauthorized");

    return next();
  };
};

/* const restrictToLoggedInUserOnly = (req,res,next) => {
    // const userUid = req.cookies?.uuid;
    const userUid = req.headers["authorization"];
    if(!userUid)
        return res.redirect("/login");

    const token = userUid.split('Bearer ')[1];  //Bearer affklafkd   (Bearer token)

    const user = getUser(token);
    if(!user)
    return res.redirect("/login");

    req.user = user;
    next();
}
const checkAuth = (req,res,next) => {
    // const userUid = req.cookies?.uuid;
    const userUid = req.headers["authorization"];
    const token = userUid.split('Bearer ')[1];  //Bearer affklafkd   (Bearer token)
    const user = getUser(token);

    req.user = user;
    next();
} */

module.exports = {
  checkForAuthentication,
  restrictTo,
  /* restrictToLoggedInUserOnly, 
    checkAuth, */
};
