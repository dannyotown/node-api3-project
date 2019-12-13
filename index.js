const express = require("express");
const users = require("./users/userRouter");
const posts = require("./posts/postRouter");

const server = express();
server.use(express.json());
// Bring all our subroutes into the main application
// (Remember, subroutes can have more children routers)
server.use((req,res,next)=>{
  console.log(`Method Used: ${req.method} --- URL Used: ${req.originalUrl} ---- TimeStamp: ${new Date} `)
next();
})
server.use("/api/users", users);
server.use("/api/posts", posts);

server.use((err, req, res, next) => {
  console.log(err),
    res.status(500).json({
      message: "Internal error occured, please try again later!"
    });
});
server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
