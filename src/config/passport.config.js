const passport = require('passport');
const local = require('passport-local');
const { createHash, isValidPassword } = require('../config/bcrypt.js');
const cartsServices = require('../services/cartsServices.js');
const usersServices = require('../services/usersServices.js');

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" }, 
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                let user = await usersServices.login(username)
                if (user) {
                    console.log("User already exists")
                    return done(null, false)
                }

                const newCart = {
                    product: []
                }

                const CartId = await cartsServices.addCart(newCart)

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cartId: CartId._id
                }

                let result = await usersServices.register(newUser)
                return done(null, result)
            } catch (error) {
                return done("Error getting the user" + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await usersServices.findByID(id);
        done(null, user)
    })

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await usersServices.login(username);
            if (!user) {
                console.log("User doesn't exists")
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                console.log("Incorrect Password")
                return done(null, false)
            } 
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}

module.exports = initializePassport;