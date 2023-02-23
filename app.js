import express from "express";
const app = express();
import userRouter from "./src/routes/users.js";

app.use('/user', userRouter)


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server runing on port ${server.address().port}`);
})
server.on('error', () => {
    console.log(error);
})