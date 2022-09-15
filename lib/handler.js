const nc = require("next-connect");
const helmet = require("helmet");
import dbConnect from "./mongo";

export default function handler() {
  return nc({
    onError(err, req, res, next) {
      res.status(405).json({ error: "something happened" });
    },
    onNoMatch(req, res, next) {
      res.status(405).json({ error: `method ${req.method} not` });
    },
  })
    .use(helmet())
    .use(async (req, res, next) => {
      await dbConnect();
      next();
    });
}
