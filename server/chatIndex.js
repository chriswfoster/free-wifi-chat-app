const http = require("http")
const cors = require("cors")
const express = require("express")
const socketIo = require("socket.io")
const { json } = require("body-parser")
const index = require("./routes/socketRoute")
const app = express()
const server = http.createServer(app)
const io = socketIo(server)
app.use(index)
app.use(json())
app.use(cors())

app.use(express.static(`${__dirname}/../build`))

const PORT = 1738

let chatText = [
  {
    user: "Chris",
    color: "white",
    time: "1524511125",
    message:
      "Hi, welcome to my chat app. This is a social platform for communicating with other people that are VERY close to you!"
  },
  {
    user: "Chris",
    color: "white",
    time: "1524511125",
    message:
      "This chat is only accessible if you're within range of my wifi. Thanks and have fun! :)"
  }
]
let members = [
  {
    user: "Chris the admin",
    color: "white"
  }
]

let interval
io.on("connection", socket => {
  if (interval) {
    clearInterval(interval)
  }
  intervalId = setInterval(() => getApiAndEmit(socket), 3000)

  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(intervalId)
  })
})

const getApiAndEmit = async socket => {
  try {
    socket.emit("FromServer", chatText)
    socket.emit("MembersList", members)
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}

app.post("/api/sendmessage", (req, res) => {
  chatText.push(req.body)
  res.status(200).json(chatText)
})
app.post("/api/usercreate", (req, res) => {
  members.includes(req.body)
    ? null
    : members.push(req.body) && res.status(200).json(req.body)
})

const path = require("path")
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"))
})

server.listen(PORT, () => console.log(`Reeemmmmyyyy boyyysss, ${PORT}!`))
