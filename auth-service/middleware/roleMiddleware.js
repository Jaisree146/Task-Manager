function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.roleId)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
}

module.exports = roleMiddleware;
