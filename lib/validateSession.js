import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const validateSession = async (req) => {
  const token = await getToken({ req, secret });

  if (!token) {
    throw new Error("authentication error");
  }

  return token.user;
}

export const validateAdmin = async (req) => {
  const token = await getToken({req, secret});

  if (token?.user.role !== "admin") {
    throw new Error("authorization error");
  }
  
  return token.user;
};