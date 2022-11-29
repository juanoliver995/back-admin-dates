import express from "express"
const router = express.Router()

import { register, login, profile } from "../controllers/userController.js"
import checkAuth from '../middleware/checkAuth.js'

router.post("/", register)

router.post("/login", login)

router.get("/profile", checkAuth, profile)


export default router