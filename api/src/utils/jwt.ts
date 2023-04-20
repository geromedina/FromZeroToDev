import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface User {
  _id: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const createAccessToken = (user: User): string => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);

  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
};

const createRefreshToken = (user: User): string => {
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1);

  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
};

const decoded = (token: string) => {
  return jwt.decode(token, { complete: true }) as jwt.JwtPayload;
};

export { createAccessToken, createRefreshToken, decoded };
