const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Bring in the User model
// =======================
const User = require('../../models/user');

// Utilize Passport Local Strategy to Log in or Log out users
// ========================

const Strategy = new LocalStrategy(
	{ 
		usernameField: 'username' // not necessary, DEFAULT
	},
	(username, password, done) => {
		User.findOne({ username: username })
		.then(user => {
			if (!user) {
				console.log("connect to db model & no user");
				return done(null, false, { message: 'Incorrect email' })
			}
			bcrypt.compare(password, user.password, (err, isMatch) => {
				console.log("connect to db model & bcryt fired");

				if (err) throw err;

				if (isMatch) {
					return done(null, user);

				} else {
					return done(null, false, {message:'Password incorrect'});
				}
			});
		})
		.catch(err => console.log(err));	
	}
)

module.exports = Strategy