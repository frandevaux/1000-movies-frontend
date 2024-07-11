import jwt from "jsonwebtoken";

const createAccessToken = (payload: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" },
      (err: any, token: any) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

export { createAccessToken };
