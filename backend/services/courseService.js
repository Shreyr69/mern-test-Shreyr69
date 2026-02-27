import Course from '../models/Course.js';

export const createCourse = async ({ courseName, courseDescription, instructor }) => {
  const course = await Course.create({ courseName, courseDescription, instructor });
  return course;
};

export const getAllCourses = async (search = '') => {
  const query = search
    ? {
        $or: [
          { courseName: { $regex: search, $options: 'i' } },
          { instructor: { $regex: search, $options: 'i' } },
          { courseDescription: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const courses = await Course.find(query).sort({ createdAt: -1 });
  return courses;
};

export const deleteCourse = async (id) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
};
