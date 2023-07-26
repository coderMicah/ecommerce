import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(user, process.env.NEXT_PUBLIC_JWT_TOKEN, { expiresIn: "30d" });
};

export default signToken;