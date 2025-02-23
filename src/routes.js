import AdminProfile from "views/admin/AdminProfile";
import CodePoints from "views/admin/CodePoints";
import Dashboard from "views/admin/Dashboard";
import GenerateCode from "views/admin/GenerateCode";
import history from "views/admin/History";
import Users from "views/admin/Users";
import AdminLogin from "views/auth/AdminLogin";
import Login from "views/auth/Login";
import Signup from "views/auth/Signup";
import EditUser from "views/user/EditUser";
import UserVerificationHistory from "views/user/UserVerificationHistory";

const dashboardRoutes = [
  {
    path: "/admin-login",
    name: "Admin Login",
    icon: "nc-icon nc-lock-circle-open",
    component: AdminLogin,
    showInSidebar: false,
  },
  {
    path: "/login",
    name: "User Login",
    icon: "nc-icon nc-key-25",
    component: Login,
    layout: "",
    showInSidebar: false,
  },
  {
    path: "/signup",
    name: "Signup",
    icon: "nc-icon nc-badge",
    component: Signup,
    showInSidebar: false,
  },
  {
    path: "/edit-user",
    name: "Edit User",
    icon: "nc-icon nc-badge",
    component: EditUser,
    showInSidebar: false,
  },
  {
    path: "/user-history",
    name: "History",
    icon: "nc-icon nc-badge",
    component: UserVerificationHistory,
    showInSidebar: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/admin-profile",
    name: "Admin Profile",
    icon: "nc-icon nc-circle-09",
    component: AdminProfile,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/user",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/history",
    name: "History",
    icon: "nc-icon nc-bullet-list-67",
    component: history,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/code-points",
    name: "Code Points",
    icon: "nc-icon nc-paper-2",
    component: CodePoints,
    layout: "/admin",
    showInSidebar: true,
  },
  {
    path: "/generate-code",
    name: "Generate Code",
    icon: "nc-icon nc-atom",
    component: GenerateCode,
    layout: "/admin",
    showInSidebar: true,
  },
];

export default dashboardRoutes;
