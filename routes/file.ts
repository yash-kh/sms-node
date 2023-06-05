import { Router, Request, Response } from "express"
import fs from "fs"

const file = Router()

file.post("/upload", function (req: Request, res: Response) {
  let file: any = req.files?.ticketImg

  if (file && file.data) {
    let dateInMilliSec = Date.now()
    let extention = file.name.split(".").pop()
    let fileName = req.body.mobileNumber + "-" + dateInMilliSec + '.' + extention

    try {
      if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads")
      }
      fs.writeFileSync("./uploads/" + fileName, file.data)
    } catch (err) {
      res.status(500).json({
        code: "internalError",
        message: "Error in saving file",
      })
    }

    res.send({
      code: "success",
      fileName
    })

  } else {
    res.send(400)
  }
})

export default file
