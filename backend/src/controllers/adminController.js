import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  // In a real production app, fetch Admin user from DB and compare bcrypt hashes.
  // Using requested hardcoded credentials for demo purposes.
  if (
    email === 'admin@gmail.com' && 
    password === 'admin@1234'
  ) {
    const token = jwt.sign(
      { role: 'admin' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};
