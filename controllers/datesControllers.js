import Dates from "../models/Dates.js"

const adminDates = async (req, res) => {
    const dates = await Dates.find().where("creator").equals(req.user)

    res.json(dates)
}

const siteDates = async (req, res) => {
    const { id } = req.params
    const dates = await Dates.find().where("creator").equals(id)
    res.json(dates)
}

const newDate = async (req, res) => {
    const date = new Dates(req.body)
    date.creator = req.user._id
    try {
        const storedDate = await date.save()
        res.json(storedDate)
    } catch (error) {
        console.log(error)
    }
    console.log(req.body)
}

const date = async (req, res) => {
    const { id } = req.params

    const date = await Dates.findById(id)

    if (!date) {
        const error = new Error("Not found")
        return res.status(404).json({ msg: error.message })
    }


    if (date.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid credentials")
        return res.status(401).json({ msg: error.message })
    }

    res.json(date)
}

const updateDate = async (req, res) => {
    const { id } = req.params

    const date = await Dates.findById(id)

    if (!date) {
        const error = new Error("Not found")
        return res.status(404).json({ msg: error.message })
    }

    if (date.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid credentials")
        return res.status(401).json({ msg: error.message })
    }

    date.day = req.body.day || date.day
    date.month = req.body.month || date.month
    date.province = req.body.province || date.province
    date.country = req.body.country || date.country
    date.club = req.body.club || date.club
    date.artist = req.body.artist || date.artist
    date.urlTickets = req.body.urlTickets || date.urlTickets

    try {
        const storedDate = await date.save()
        res.json(storedDate)
    } catch (error) {
        console.log(error)
    }

}
const deleteDate = async (req, res) => {
    const { id } = req.params

    const date = await Dates.findById(id)

    if (!date) {
        const error = new Error("Not found")
        return res.status(404).json({ msg: error.message })
    }

    if (date.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid credentials")
        return res.status(401).json({ msg: error.message })
    }

    try {
        await date.deleteOne()
        res.json({ msg: "Deleted proyect" })
    } catch (error) {
        console.log(error)
    }

}

export { adminDates, siteDates, newDate, updateDate, deleteDate, date }