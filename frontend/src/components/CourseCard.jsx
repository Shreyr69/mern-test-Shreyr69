const CourseCard = ({ course, onDelete }) => {
  const formattedDate = new Date(course.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3 className="course-name">{course.courseName}</h3>
        <button
          className="btn-delete"
          onClick={() => onDelete(course._id)}
          title="Delete course"
        >
          ✕
        </button>
      </div>
      <p className="course-description">{course.courseDescription}</p>
      <div className="course-footer">
        <span className="course-instructor">👨‍🏫 {course.instructor}</span>
        <span className="course-date">{formattedDate}</span>
      </div>
    </div>
  );
};

export default CourseCard;
