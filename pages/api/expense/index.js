import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/mongo";
import { getUserExpenseData, postUserExpenseData } from "../../../lib/user/user.model";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    const session = await getSession({ req });
    const expenses = req.body;
  
    if (!session) {
      return res.status(401).json({
        error: "Not Authenticated",
      });
    }
    
    try {
      await postUserExpenseData(session.user.email, expenses);
    } catch {
      return res.status(500).json({
        error: "server Error! expense could not be saved",
      });
    }
  
    return res.status(200).json({ message: "expense updated" });
  } else if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        error: "Not Authenticated",
      });
    }

    try {
      const expense = await getUserExpenseData(session.user.email);
      return res.status(200).json(expense);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    }

  } else {
    return res.status(404).json({
      error: "Resource not found",
    });
  }
}
