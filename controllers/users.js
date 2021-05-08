const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config()
const Users = require('../model/users')
const {HttpCode} = require('../helper/constans')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const reg = async (req, res, next) => {
  const {email} = reg.body
  const user = await Users.findUserByEmail(email)  
  if (user) {
      return res.status(HttpCode.CONFLICT).json({
          status: 'error',
          code: HttpCode.CONFLICT,
          message: 'Email is already use',
      })
  }
  try {
      const {newUser} = await Users.addUser(reg.body)
      return res.status(HttpCode.CREATED).json({
          status: 'success',
          code: HttpCode.CREATED,
          data: {
              id: newUser.id,
              email: newUser.email,
              subscription: newUser.subscription,
              avatar: newUser.avatar,
          }
      })
} catch(e) {
    next(e)
}
  }

  const login = async (req, res, next) => {
    const {email, password} = reg.body
  const user = await Users.findUserByEmail(email)
  const isValidPassport = await user?.validPassword(password)
  if (!user || !isValidPassport) {
    return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
    })
}
const payload = {id: user.id}
const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '2h'})
await Users.updateUserToken(user.id, token)
return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {token},
})
}

const logout = async (req, res, next) => {
    const id = reg.user.id
    await Users.updateUserToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
}

const updateAvatar = async (req, res, next) => {
    const {id} = req.user
    const avatarUrl = await saveAvatarUser(req)
    await Users.updateAvatar(id, avatarUrl)
    return res.status(HttpCode.OK).json({ status: 'succes', code: HttpCode.OK, data: {avatarUrl}})
}

const saveAvatarUser = async (req) => {
    FOLDER_AVATARS = process.env.FOLDER_AVATARS
    const pathFile = req.file.path
    const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`
    const img = await jimp.read(pathFile)
    await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile)
    try {
        await fs.rename(
            pathFile,
            path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar),
        )
    } catch(e) {
        console.log(e.message)
        }
    const oldAvatar = req.user.avatar
        if(oldAvatar.includes(`${FOLDER_AVATARS}/`)) {
            await fs.unlink(path.join(process.cwd(), 'public', oldAvatar)) 
          }
    return path.join(FOLDER_AVATARS, newNameAvatar)
}

module.exports = {
    reg,
    login,
    logout,
    updateAvatar,
}