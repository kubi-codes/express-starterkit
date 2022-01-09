var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var http = require("http");

var app = express();
var env = process.env.NODE_ENV || "development";
var indexRouter = require("./routes/index");

/* CORS Setting */
if (env) {
  app.use(cors());
  // CORS TO ALL
} else {
  // Allowed Url Origins
  const allowedOrigins = ["http://localhost:3000"];
  app.use(
    cors({
      origin: function (origin, callback) {
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.json({
    status: true,
    messages: "Api running well",
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// init server
var server = http.createServer(app);
// var { Server } = require("socket.io");
// var io = new Server(server);

/*
 * Run another socket in here.
 */
// const { addUser, getUser, deleteUser, getUsers } = require("./users");

// io.on("connection", (socket) => {
//   socket.on("login", ({ name, room }, callback) => {
//     const { user, error } = addUser(socket.id, name, room);
//     if (error) return callback(error);
//     socket.join(user.room);
//     socket.in(room).emit("notification", {
//       title: "Someone's here",
//       description: `${user.name} just entered the room`,
//     });
//     io.in(room).emit("users", getUsers(room));
//     callback();
//   });

//   socket.on("sendMessage", (message) => {
//     const user = getUser(socket.id);
//     io.in(user.room).emit("message", { user: user.name, text: message });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//     const user = deleteUser(socket.id);
//     if (user) {
//       io.in(user.room).emit("notification", {
//         title: "Someone just left",
//         description: `${user.name} just left the room`,
//       });
//       io.in(user.room).emit("users", getUsers(user.room));
//     }
//   });
// });

module.exports = { app, server };
