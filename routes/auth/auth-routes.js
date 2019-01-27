const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated , signout} = require('../../config/utils');
// ================================
// Bring in the User Model of the DB
const User = require('../../models/user');
// ===============================
// Authentication Routes
// ===============================
// ++++ Get User ++++
router.get('/user', (req, res, next) => {
	if(req.user) {
        console.log("Happy day. User is authenticated")
		return res.status(200).json({
			user: req.user,
			authenticated: true
		});
    } else if(!req.user)  {
		return res.status(201).json({
			authenticated: false
		});
	}
    else  {
		return res.status(401).json({
			error: 'User is not authenticated',
			authenticated: false
		});
	}
})
// ++++ sign up ++++
// The user's password is automatically hashed with bcrypt and saved to the User Model. 
router.post("/signup", function(req, res) {
    console.log("You are receiving a signup request from " + req.body.username);
    const { username, email, password} = req.body;
    let errors = [];
        // *** Sanitize data before sending to DB. *** 
        if (!username || !email || !password) {
            errors.push({msg: 'Please fill in all required fields'});
        } if (password.length < 6) {
            errors.push({msg: 'Please use a password that is at least 6 characters'});
        } // ****************
    // If there is an error send it to the client side
    if (errors.length > 0) {
        res.send({errors});
    } else {    
    // If there are no errors then we can touch the DB
    User.findOne({ email: email})
    .then (user => {
        // If the user is already registered send an error message
        if (user) {
            errors.push({msg:"Email is already registered."});
            res.send({errors});
        } else {
        // If not, let's make a new friend! 
            const newUser = new User ({username, email, password });
            console.log("Here is the new users from line 46 " + newUser);
            bcrypt.genSalt(10, (err,salt) =>
                bcrypt.hash( newUser.password, salt, (err,hash) =>{
                    newUser.password = hash;
                    // now save the newUser object.
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', "You are not registered!")
                        // **** Or res.JSON user *****
                        res.redirect("/login")
                    })
                    .catch(err => console.log(err) )
                }
                ))
        }
    })

    }
})
// ++++ Log in ++++
router.post('/auth/login',passport.authenticate("local", { failureRedirect: '/', failureFlash:true }),
    (req, res, next) => {
    console.log("Check it out. You've hit log in route.")
    req.session.save((err) => {
        if (err) {
            console.log("There is a login error " + err)
                return next(err);
        }
        console.log("User session has been saved ")
        console.log(req.body)
        res.status(200).send(req.body);
    });    
})
// ++++ Log out ++++
router.get('/logout', (req, res, next) => {
    console.log("Beginning to log-out... Good-bye.")
    console.log(req.user)
    if (req.user) {
        console.log("------------------------")
        console.log("Passport logout method has finished with user: ")
        console.log(req.user)
        console.log("------------------------")
        req.logout()
        // req.session.save((err) => {
        //     if (err) {
        //         console.log('There is an error in the session method')
        //         return next(err)}
        // });
        res.status(200).send('Ok')
    } else {
        console.log("Uh-oh. No user to logout")
        res.send({ msg: 'no user to log out' })
    }
})
// ++++ Dashboard ++++
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    console.log("The sever is serving the Dashboard")
    res.send('you have a dashboard message')
} )

// Use this to test that your API is working
router.get('/ping', (req, res) => {
    console.log("pong!")
    res.status(200).send("pong!");
});


// ++++ sign up ++++
// router.get('/signup', (req, res) => res.send('you have a register message'))
// router.get('/login', (req, res) => {
//     console.log("you have hit log in route")

//     res.send('you have a login message')})

  
   

    

module.exports = router;