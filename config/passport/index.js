const passport = require('passport')
const LocalStrategy = require('./LocalStrategy')
const User = require('../../models/user')



// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('*** serializeUser called, user: ')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, user._id)
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called: ' + id)
	User.findById( id, (err, user) => {
			console.log('*** Deserialize user:')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})
passport.use(LocalStrategy)
module.exports = passport

	
