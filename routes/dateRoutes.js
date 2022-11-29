import express from "express"

const router = express.Router()

import { adminDates, siteDates, newDate, updateDate, deleteDate, date } from "../controllers/datesControllers.js"
import checkAuth from '../middleware/checkAuth.js'


router.get("/site/:id", siteDates)

router
    .route("/")
    .get(checkAuth, adminDates)
    .post(checkAuth, newDate)

router
    .route("/:id")
    .get(checkAuth, date)
    .put(checkAuth, updateDate)
    .delete(checkAuth, deleteDate)



export default router