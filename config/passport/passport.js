// load bcrypt
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  let User = user;
  let LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "userName",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, userName, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({
          where: {
            userName: userName
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That useranme is already taken"
            });
          } else {
            var userPassword = generateHash(password);
            var data = {
              userName: userName,
              password: userPassword
            };

            User.create(data).then(function(newUser) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with userName
        usernameField: "userName",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, userName, password, done) {
        var User = user;
        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        User.findOne({
          where: {
            userName: userName
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Username does not exist"
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );

  // serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    User.findByPk(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
