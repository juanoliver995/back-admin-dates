import User from "../models/User.js"
import generateID from '../helpers/generateID.js'
import generateJWT from '../helpers/generateJWT.js'


const register = async (req, res) => {
    try {
        const user = new User(req.body)
        user.token = generateID()
        const userStored = await user.save()
        res.json(userStored)

    } catch (error) {
        console.log(error)
    }
}


const login = async (req, res) => {

    const { body } = req
    const { username, password } = await body

    // Comprobar si el usuario existe

    const user = await User.findOne({ username })
    if (!user) {
        const error = new Error('Username does not exist')
        return res.status(404).json({ msg: error.message })
    }

    // Comprobar el password

    if (await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            token: generateJWT(user._id)
        })

    } else {
        const error = new Error("Invalid credentials")
        return res.status(403).json({ msg: error.message })
    }


}

const profile = async (req, res) => {
    const { user } = req

    res.json(user)
}

export {
    register,
    login,
    profile
}