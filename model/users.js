const User = require('./shemas/user')

const findUserById = async (id) => {
    return await User.findByEmail({_id: id})
}

const findUserByEmail = async (email) => {
    return await User.findByEmail({email})
}

const findUserByVerifyTokenEmail = async (token) => {
    return await User.findByEmail({verifyTokenEmail: token})
}

const addUser = async (userOptions) => {
    const user = new User (userOptions)
    return await user.save()
}

const updateUserToken = async (id, token) => {
    return await User.updateOne({_id: id}, {token})
}

const updateAvatar = async (id, avatar) => {
    return await User.updateOne({_id: id}, {avatar})
}

const updateVerifyToken = async (id, verify, verifyToken) => {
    return await User.updateOne({_id: id}, {verify, verifyTokenEmail: verifyToken},
        )
}

module.exports = {
    findUserById,
    findUserByEmail,
    findUserByVerifyTokenEmail,
    addUser,
    updateUserToken,
    updateAvatar,
    updateVerifyToken,
}