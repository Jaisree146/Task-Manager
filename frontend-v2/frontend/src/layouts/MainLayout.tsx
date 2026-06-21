import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar/>
      <hr/>
      <Outlet/>
    </>
  );
}
export default MainLayout;
