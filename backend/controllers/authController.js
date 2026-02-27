import * as authService from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerStudent({ name, email, password });
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginStudent({ email, password });
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
