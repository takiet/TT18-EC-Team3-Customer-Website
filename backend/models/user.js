const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validatePhoneNumber = require('validate-phone-number-node-js')

const config = require('../config')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
   phone : {
       type : Number,
       required: true,
       validate: value => {
            if (!validatePhoneNumber.validate(value)){
                throw new Error({error : 'Invalid Phone number'})
            }
       }
   }, 
   address : {
       type: String,
       required: false
   },
   DayCreated : {
       type: String,
       required: false,
   },
   LastAccessed : {
       type: String,
       required: false,
   },
   gender : {
       type: Boolean,
       required : true,
   },
   acalevel: {
       type: String,
       required: false,
   },
   fav_subs: [{
        subject: {
            type: String,
            required: false
        }
   }],
   DOB: {
       type: String,
       required: true,
   },
   sessions: [{
    token: {
        type: String,
        required: true
    }
}]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    let today = new Date().toISOString().slice(0, 10)
    user.DayCreated = today
    user.LastAccessed = today
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, config.refreshTokenSecret)

    user.sessions = user.sessions.concat({token})
    await user.save()
    const access = jwt.sign({_id : user._id, session: token}, config.secret, {
        expiresIn : config.tokenLife,
    })
    return [access, token]
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User