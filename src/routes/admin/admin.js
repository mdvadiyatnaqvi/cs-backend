import { Router } from 'express';
import Admin from '../../models/Admin.js';
import jwt from 'jsonwebtoken';

const router = Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    let admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

