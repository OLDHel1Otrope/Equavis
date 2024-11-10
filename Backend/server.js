// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Sample user data (this would be replaced with a real database in production)
let users = [
  {
    id: 1,
    username: 'testuser',
    password: '$2b$10$h0K8a8X.Xrzqi1v9N08mtu7mbZ//4OKcD2/2DIeCKAKjG.GZpsh7K' // hashed version of 'password'
  }
];

// Secret key for JWT (use environment variables in production)
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Middleware to verify the token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(403).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach the user data to the request object
    next();
  } catch (err) {
    res.status(401).send('Invalid token.');
  }
}

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  // Check if user already exists
  if (users.find(user => user.username === username)) {
    return res.status(400).send('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword
  };
  users.push(newUser);
  res.status(201).send('User registered successfully');
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).send('Invalid username or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid username or password');
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route. You are authenticated!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
