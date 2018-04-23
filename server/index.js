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

const PORT = 1738

let chatText = []

let interval;
io.on("connection", socket => {
    if (interval) {
        clearInterval(interval);
      }
  intervalId = setInterval(() => getApiAndEmit(socket), 5000)

  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(intervalId)
  })
})

const getApiAndEmit = async socket => {
  try {
    const sd1obj = {
      data1: "This is the SD1 Message",
    }
    socket.emit("FromServer", sd1obj)
    // console.log(sd1obj)
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}

app.post('/api/sendmessage', (req, res) => {
    chatText.push(req.body)
    res.status(200).json(chatText)
})

server.listen(PORT, () => console.log(`Reeemmmmyyyy boyyysss, ${PORT}!`))