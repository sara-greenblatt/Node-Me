const express = require('express');
const jwt = require('jsonwebtoken');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// Secret key for JWT
const secretKey = 'mySecretKey';

// Initialize express-session
app.use(
  expressSession({
    secret: 'sessionSecret', // Secret for session management
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());

// Sample user data (you can replace this with your user data)
const users = {
  user1: {
    username: 'user1',
    password: 'password1',
  },
};

// Middleware to protect routes
const requireAuth = (req, res, next) => {
  const token = req.session.token;

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.sendStatus(403); // Invalid token
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = users[username];

  if (user && user.password === password) {
    // Create a JWT
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    // Store the token in the user's session
    req.session.token = token;
    res.json({ token });
  } else {
    res.sendStatus(401); // Unauthorizedconst express = require('express');
    const jwt = require('jsonwebtoken');
    const expressSession = require('express-session');
    const cookieParser = require('cookie-parser');
    
    const app = express();
    
    // Secret key for JWT
    const secretKey = 'mySecretKey';
    
    // Initialize express-session
    app.use(
      expressSession({
        secret: 'sessionSecret', // Secret for session management
        resave: false,
        saveUninitialized: true,
      })
    );
    
    app.use(cookieParser());
    
    // Sample user data (you can replace this with your user data)
    const users = {
      user1: {
        username: 'user1',
        password: 'password1',
      },
    };
    
    // Middleware to protect routes
    const requireAuth = (req, res, next) => {
      if (req.session.isAuthenticated) {
        next(); // User is authenticated in the session, allow access.
      } else {
        res.sendStatus(401); // Unauthorized
      }
    };
    
    // Login route
    app.post('/login', (req, res) => {
      const { username, password } = req.body;
    
      // Check if the user exists
      const user = users[username];
    
      if (user && user.password === password) {
        // Create a JWT
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    
        // Store the token in the user's session
        req.session.isAuthenticated = true;
    
        res.json({ token });
      } else {
        res.sendStatus(401); // Unauthorized
      }
    });
    
    // Protected route
    app.get('/protected', requireAuth, (req, res) => {
      res.json({ message: 'This is a protected route' });
    });
    
    // Logout route
    app.post('/logout', (req, res) => {
      req.session.destroy(() => {
        res.sendStatus(200);
      });
    });
    
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
    
  }
});

// Protected route
app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
