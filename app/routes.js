module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('books').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            books: result
          })
        })
    });

    // LOGOUT ==============================
    // app.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });


      app.get('/logout', function(req, res, next) {
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });

// message board routes ===============================================================

    app.post('/books', (req, res) => {
      db.collection('books').save({name: req.body.name, bookName: req.body.bookName, status: null}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/books', (req, res) => {

   
      let value = "Finished Reading" 
      db.collection('books')
      .findOneAndUpdate({name: req.body.name, bookName: req.body.bookName}, {
        $set: {
          status:value
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })
    //api that gives back response
    app.put('/bookmarks', (req, res) => {
      let value = "Currently Reading"
      db.collection('books')
      .findOneAndUpdate({name: req.body.name, bookName: req.body.bookName}, {
        $set: {
          status: value,
          
        }
      }, {
        //sorts descending
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)

        res.send(result)
      })
    })

    app.delete('/books', (req, res) => {
      db.collection('books').findOneAndDelete({name: req.body.name, bookName: req.body.bookName}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash books
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash books
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
