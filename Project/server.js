// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// const PORT =  3001;
// const MONGODB_URI = 'mongodb://localhost:27017/myapp';

// app.use(cors());
// app.use(express.json());

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define MongoDB schemas and models for User and Order
// const User = mongoose.model('User', {
//   name: String,
//   phoneNumber: String,
//   password: String,
// });

// const Order = mongoose.model('Order', {
//   user_id: String,
//   sub_total: Number,
//   phoneNumber: String,
// });

// // Register new user
// app.post('/add-user', async (req, res) => {
//   try {
//     const { name, phoneNumber, password } = req.body;
//     // const hashedPassword = await bcrypt.hash(password, 10);

//     // const newUser = new User({ name, phoneNumber, password: hashedPassword });
//      const newUser = new User({ name, phoneNumber, password });
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// // User login
// app.post('/login-user', async (req, res) => {
//   try {
//     const { phoneNumber, password } = req.body;

//     const user = await User.findOne({ phoneNumber });
//     if (!user) {
//       return res.status(401).json({ error: 'User not found' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // const token = jwt.sign({ userId: user._id }, 'your-secret-key');
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// // Add new order
// app.post('/add-order', async (req, res) => {
//   try {
//     const { user_id, sub_total, phoneNumber } = req.body;

//     const newOrder = new Order({ user_id, sub_total, phoneNumber });
//     await newOrder.save();

//     res.status(201).json({ message: 'Order added successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// // Get order details
// app.get('/get-order', async (req, res) => {
//   try {
//     const { user_id } = req.query;

//     const orders = await Order.find({ user_id });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schemas and models for User and Order
const User = mongoose.model('User', {
  name: String,
  phoneNumber: String,
  password: String,
});

const Order = mongoose.model('Order', {
  user_id: String,
  sub_total: Number,
  phoneNumber: String,
});

// Register new user
app.post('/add-user', async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, phoneNumber, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// User login
app.post('/login-user', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Add new order
app.post('/add-order', async (req, res) => {
  try {
    const { user_id, sub_total, phoneNumber } = req.body;

    const newOrder = new Order({ user_id, sub_total, phoneNumber });
    await newOrder.save();

    res.status(201).json({ message: 'Order added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get order details
app.get('/get-order', async (req, res) => {
  try {
    const { user_id } = req.query;

    const orders = await Order.find({ user_id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

