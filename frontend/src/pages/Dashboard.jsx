import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [filterInstructor, setFilterInstructor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchCourses = async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(
        `${API_URL}/api/courses${searchTerm ? `?search=${searchTerm}` : ''}`,
        authHeaders
      );
      setCourses(data.courses);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchCourses(val);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await axios.delete(`${API_URL}/api/courses/${id}`, authHeaders);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete course');
    }
  };

  // Unique instructors for filter dropdown
  const instructors = useMemo(
    () => [...new Set(courses.map((c) => c.instructor))].sort(),
    [courses]
  );

  // Client-side filter by instructor
  const displayed = filterInstructor
    ? courses.filter((c) => c.instructor === filterInstructor)
    : courses;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">All Courses</h1>
            <p className="page-subtitle">{displayed.length} course{displayed.length !== 1 ? 's' : ''} available</p>
          </div>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={handleSearchChange}
            placeholder="🔍 Search by name, instructor, description..."
          />
          <select
            className="filter-select"
            value={filterInstructor}
            onChange={(e) => setFilterInstructor(e.target.value)}
          >
            <option value="">All Instructors</option>
            {instructors.map((inst) => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>
          {(search || filterInstructor) && (
            <button
              className="btn-clear"
              onClick={() => { setSearch(''); setFilterInstructor(''); fetchCourses(''); }}
            >
              Clear
            </button>
          )}
        </div>

        {loading && <p className="info-msg">Loading courses...</p>}
        {error && <div className="error-msg">{error}</div>}
        {!loading && displayed.length === 0 && (
          <p className="info-msg">No courses found.</p>
        )}

        <div className="courses-grid">
          {displayed.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
