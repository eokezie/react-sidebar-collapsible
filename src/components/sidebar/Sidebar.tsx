import { useRef, useState } from "react";
// import logo from "./logo.svg";
import "./styles.css";

const navItems = ["home", "settings", "backup", "mail", "cloud"];

export const Sidebar = () => {
  const [width, setWidth] = useState(250);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sidebarRef = useRef<HTMLElement>(null);
  const sidebar = sidebarRef.current;

  const resize = (e: any) => {
    let newWidth = e.clientX - sidebar?.offsetLeft!;
    if (newWidth < 61) newWidth = 60;
    if (newWidth > 249) newWidth = 250;
    setWidth(newWidth);
  };

  const stopResize = () => {
    document.body.style.cursor = "default";
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
  };

  const initResize = () => {
    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  };

  const adjustSidebar = () => {
    setIsTransitioning(true);
    const newWidth = width === 60 ? 250 : 60;

    setTimeout(() => {
      setWidth(newWidth);
      setIsTransitioning(false);
    }, 100);
  };

  return (
    <aside
      style={{ width: `${width}px` }}
      className={`sidebar ${isTransitioning ? "transitioning" : ""}`}
    >
      <div className="handle" onMouseDown={initResize}></div>
      <div className="sidebar-inner">
        <header className="sidebar-header">
          <button
            type="button"
            className="sidebar-burger"
            onClick={adjustSidebar}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <img
            src={
              "https://raw.githubusercontent.com/frontend-joe/react-sidebars/8c9687091dd606a7241a648515f70762b96c0629/src/sidebars/sidebar-9/logo.svg"
            }
            className="sidebar-logo"
          />
        </header>
        <nav className="sidebar-menu">
          {navItems.map((item) => (
            <button key={item} type="button" className="sidebar-button">
              <span className="material-symbols-outlined">{item}</span>
              <p>{item}</p>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
