import { Router } from 'express';
import Client from '../../models/Client.js';
import authMiddleware from '../../middleware/auth.js';

const router = Router();

// POST /api/clients/add-client
router.post('/add-client', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Generate unique clientId
    const clientId = `CLIENT_${Date.now().toString().slice(-6)}`;

    // Check if clientId already exists
    const existingClient = await Client.findOne({ clientId });
    if (existingClient) {
      return res.status(400).json({ error: 'Client ID already exists' });
    }

    // Create new client
    const newClient = new Client({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      clientId
    });

    await newClient.save();

    res.status(201).json({
      success: true,
      client: {
        id: newClient._id,
        name: newClient.name,
        email: newClient.email,
        clientId: newClient.clientId
      }
    });

  } catch (error) {
    console.error('Add client error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/clients/get-clients - Returns all clients with total count
router.get('/get-clients', authMiddleware, async (req, res) => {
  try {
    const totalCount = await Client.countDocuments();
    const clients = await Client.find().select('name email clientId createdAt').lean();

    res.json({
      success: true,
      count: totalCount,
      clients
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
