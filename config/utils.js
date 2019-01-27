module.exports = {
    ensureAuthenticated: function (req, res, next) {
        console.log('attempting to authenticate')
        if (req.isAuthenticated()) {
            return next();
        }
        // req.flash('error_msg', 'Not so fast.  Tell us who you are first.')
        console.log('error during authenticating')
        res.redirect('/login')
    },
    signout: function (cb) {
        
		axios({
            method: 'POST',
            url: '/logout'
		})
		.then((res) => {
			if (typeof cb === 'function') {
				console.log("user was logged out")
				cb(true);
			}
		})
		.catch((err) => {
			console.log('Error logging out user.');
			if (typeof cb === 'function') {
				// user was not logged out
				cb(false);
			}
		});
	}
}