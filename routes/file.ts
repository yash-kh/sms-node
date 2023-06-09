import { Router, Request, Response } from "express"
import fs from "fs"
import crypto from "crypto"

const file = Router()

file.post("/upload", function (req: Request, res: Response) {
  let file: any = req.files?.ticketImg

  if (file && file.data) {
    let dateInMilliSec = Date.now()
    let extention = file.name.split(".").pop()
    let id = crypto.randomBytes(5).toString('hex')
    let fileName = id + '-' + dateInMilliSec + '.' + extention

    try {
      if (!fs.existsSync("./uploads")) {
        fs.mkdirSync("./uploads")
      }
      if(fs.existsSync("./uploads/" + fileName)){
        res.status(500).json({
          code: "internalError",
          message: "Error in saving file",
        })
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
