const jwt = require('jsonwebtoken');

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

function generateToken(user) {
  // Replace 'your_jwt_secret' with your actual secret key
  return jwt.sign(
    { id: user.id, username: user.name },
    'your_jwt_secret',
    { expiresIn: '1h' }
  );
}

module.exports = { generateToken };

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.name = req.body.name;
  res.json(user);
};

exports.deleteUser = (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'User deleted' });
};
