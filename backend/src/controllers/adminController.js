import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  
  
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
