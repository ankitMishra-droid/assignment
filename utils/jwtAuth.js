import { validateToken } from "../service/auth.js";

const tokenBlacklist = new Set();

const authenticate = (req, h) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return h
      .response({ message: "Authorization header missing" })
      .code(401)
      .takeover();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return h.response({ message: "Token missing" }).code(401).takeover();
  }

  if (tokenBlacklist.has(token)) {
    return h.response({ message: "Token is invalidated" }).code(401).takeover();
  }

  try {
    const user = validateToken(token);
    req.user = user;
    return h.continue;
  } catch (error) {
    return h.response({ message: error.message }).code(401).takeover();
  }
};

function restrictTo(roles = []){
  return function(req, h){
    if(!req.user){
      return h.response({
        message: "please login first"
      }).code(401)
    }

    if(!roles.includes(req.user.role)){
      return h.response({
        message: "You do not have permission to access this",
        error: true,
        success: false
      }).code(403);
    }

    return h.continue;
  }
}

export { authenticate, restrictTo };
