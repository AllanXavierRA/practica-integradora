import { Router } from "express";
const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send('hola ')
})



export default userRouter;
