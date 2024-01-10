const jwt = require("jsonwebtoken");

const handleAuthError = (res) => {
  res.status(401).send({ message: "Authorization Error" });
};

const { authorization } = req.headers;
if (!authorization || !authorization.startsWith("Bearer ")) {
  return handleAuthError(res);
}

const token = authorization.replace("Bearer ", "");
let payload;

try {
  payload = jwt.verify(token, JWT_SECRET);
} catch (err) {
  return handleAuthError(res);
}

req.user = payload;

next();
