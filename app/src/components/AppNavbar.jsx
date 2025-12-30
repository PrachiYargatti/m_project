import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";

function AppNavbar() {
  const role = sessionStorage.getItem("role");

  return (
    <>
      <Navbar />
      {role === "admin" && <AdminNavbar />}
    </>
  );
}

export default AppNavbar;
