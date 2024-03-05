import { Outlet } from "react-router-dom";
import Navbar from "../../components/DashboardComps/Navbar/Navbar";
import Footer from "../../components/DashboardComps/Footer/Footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Dashboard;
