const express = require("express");
const cors = require("cors");
const { emit } = require("process");
const app = express();
var http = require("http").Server(app);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("hello from ansh sinha socket server");
});

var io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

const Users = {};

const Room = {};

io.on("connection", (socket) => {
  //yha kya hoga ki jb phone se user barcode scan krega tb usme ek string hogi jo ki desktop ka name hoga
  //ya ip fir user-connect event call krenge and usi name se room banayenge jisme sirf 2 hi log ki limit hogi
  // use Rooms me add kr denge

  console.log("connection established");

  socket.emit("connects", "Hello welcome to Ansh socket server");

  socket.on("room", (room) => {
    console.log(room);
    socket.join(room);
    Room["roomname"] = room;
  });

  socket.on("user-connect", (name) => {
    //hum chahte hai ki jab user connect kre desktop se to ek room bne un dono ka

    // Room[room.id] = name;
    //ervey thing here
    TODO: socket.brodcast.emit("user-connected", name);
  });

  socket.on("connected", (mesg) => {
    console.log("name lelo se request agya hai :", mesg);
  });
  socket.on("msg", (msg) => {
    console.log(msg);
  });

  //for text
  socket.on("sendText", (message) => {
    console.log(message);

    // socket.to(room).emit("textreceived", message);
    socket.broadcast.emit("textreceived", message);
  });

  //for image
  socket.on("sendImage", (image) => {
    
    socket.broadcast.emit("receivedImage", image);
  });
  //on disconnect
  socket.on("disconnect", () => {
    socket.broadcast.emit("disconnected", "Server disconnected");
  });
});

var server = http.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});
