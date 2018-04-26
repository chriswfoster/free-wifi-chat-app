const http = require("http")
const cors = require("cors")
const express = require("express")
const socketIo = require("socket.io")
const { json } = require("body-parser")
const index = require("./routes/socketRoute")
const app = express()
app.use(index)
app.use(json())
app.use(cors())

const server = http.createServer(app)
const io = socketIo(server)
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

io.on("connection", socket => {
  console.log("A user has connected to the system.")
  io.sockets.emit("Messages", chatText)
  io.sockets.emit("Members", members)
  socket.on("Messages", message => {
    chatText.push(message)
    console.log(chatText)
    io.sockets.emit("Messages", chatText)
  })

  socket.on("Members", member => {
    members.push(member)
    console.log(members)
    io.sockets.emit("Members", members)
  })

  socket.on("delete message", id => {
    let index = messages.findIndex(message => message.id === id)
    if (index !== -1) {
      messages.splice(index, 1)
      io.sockets.emit("delete message", chatText)
    }
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
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
