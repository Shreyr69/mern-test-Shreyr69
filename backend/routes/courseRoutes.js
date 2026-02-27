import express from 'express';
import { createCourse, getCourses, deleteCourse, updateCourse } from '../controllers/courseController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCourse);
router.get('/', protect, getCourses);
router.delete('/:id', protect, deleteCourse);
router.put('/:id', protect, updateCourse);

export default router;
