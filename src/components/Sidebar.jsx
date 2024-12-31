import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/student-dashboard/view-timetable">View Timetable</Link></li>
        <li><Link to="/student-dashboard/study-materials">Study Materials</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
