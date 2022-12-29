import { NavLink } from "react-router-dom";

const NavItem = ({ to, className, color, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? className : "")}
      style={({ isActive }) => (isActive ? { backgroundColor: color } : {})}>
      {children}
    </NavLink>
  );
};
export default NavItem;
