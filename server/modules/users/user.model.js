import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    secret: { type: String },
    topics: { type: Array },
    avatarUrl: {
      type: String
    },
    bio: {
      type: String
    },
    about: {
      type: String
    },
    website: {
      type: String
    },
    linkedin: {
      type: String
    },
    twitter: {
      type: String
    },
    github: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isSuperAdmin: {
      type: Boolean,
      default: false
    },
    publicEmail: {
      type: String
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  const hashedpassword = await bcrypt.hash(user.password, 10)

  user.password = hashedpassword

  next()
})

userSchema.methods.matchPasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const userModel = mongoose.model('User', userSchema)

export { userModel }
