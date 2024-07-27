import { useEffect, useState, useContext } from 'react';
import "./Sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartPie, faChartLine, faMap, faFilter } from '@fortawesome/free-solid-svg-icons';
import { SidebarContext } from './Sidebarcontext';
import Filters from '../Charts/Filters';  
const Sidebar = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const [showFilters, setShowFilters] = useState(false); 
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-title">
        <div className="title-img img-fit-cover">
          <img src='./logo192.png' alt="profile image" />
        </div>
        <span className="title-name">Dashboard</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" className={`nav-link ${activeLinkIdx === 1 ? 'active' : ''}`} onClick={() => setActiveLinkIdx(1)}>
              <i className="nav-link-icon"><FontAwesomeIcon icon={faChartBar} /></i><span className="nav-link-text">Bar Chart</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className={`nav-link ${activeLinkIdx === 2 ? 'active' : ''}`} onClick={() => setActiveLinkIdx(2)}>
              <i className="nav-link-icon"><FontAwesomeIcon icon={faChartPie} /></i><span className="nav-link-text">Pie Chart</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className={`nav-link ${activeLinkIdx === 3 ? 'active' : ''}`} onClick={() => setActiveLinkIdx(3)}>
              <i className="nav-link-icon"><FontAwesomeIcon icon={faChartLine} /></i><span className="nav-link-text">Line Chart</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className={`nav-link ${activeLinkIdx === 4 ? 'active' : ''}`} onClick={() => setActiveLinkIdx(4)}>
              <i className="nav-link-icon"><FontAwesomeIcon icon={faMap} /></i><span className="nav-link-text">Map</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className={`nav-link ${activeLinkIdx === 5 ? 'active' : ''}`} onClick={() => {
              setActiveLinkIdx(5);
              setShowFilters(!showFilters);
            }}>
              <i className="nav-link-icon"><FontAwesomeIcon icon={faFilter} /></i><span className="nav-link-text">Filter</span>
            </a>
          </li>
        </ul>
        {showFilters && <Filters />} 
      </nav>
    </div>
  );
};

export default Sidebar;
