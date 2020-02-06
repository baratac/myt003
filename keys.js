module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_KEY,
    googleAuth: {
      id: process.env.G_AUTH_ID,
      key: process.env.G_AUTH_KEY
    },
    session: {
      cookieKey: process.env.S_COOKEY_KEY
    }
  };
