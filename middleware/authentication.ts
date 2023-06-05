import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export default function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]

    let secret = process.env.SECRET || ""

    //Decoding the token
    jwt.verify(token, Buffer.from(secret, "base64"), (err, token: any) => {
      if (err) {
        res
          .status(401)
          .json({ code: "unauthorized", message: "Error! Token was not provided." })
      } else {
        req.body.mobileNumber = token.sub
        next()
      }
    })
  } else {
    res
      .status(401)
      .json({ code: "unauthorized", message: "Error! Token was not provided." })
  }
}
