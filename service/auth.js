import jwt from "jsonwebtoken";

// Generate a JWT token for the user
function userToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    userName: user.userName,
  };

  return jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRY });
}

function validateToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export { userToken, validateToken };
