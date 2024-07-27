import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SidebarContext } from "../Sidebar/Sidebarcontext";
import "./Header.css";

const Header = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button type="button" className="sidebar-toggler" onClick={() => toggleSidebar() }>
          <i><FontAwesomeIcon icon={faBars} alt="" /></i>
        </button>
        <h3 className="content-top-title">Visualization Dashboard</h3>
      </div>
      <div className="content-top-btns">
        <button type="button" className="search-btn content-top-btn">
          <i><FontAwesomeIcon icon={faSearch} alt="" /></i>
        </button>
        <button className="notification-btn content-top-btn">
          <i><FontAwesomeIcon icon={faBell} alt="" /></i>
          <span className="notification-btn-dot"></span>
        </button>
      </div>
    </div>
  )
}

export default Header;
