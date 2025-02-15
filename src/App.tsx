
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DemoProject from "./components/demoProject/components/1_Router";
import MultiStepForm from "./components/ReactForm/MultiStepForm";
import TanStack from "./components/tanStack/1_Routing";
import ZuStand from "./components/zustand/1_BasicApp";
import Main from "./components/ResponsiveWebsite/components/pages/Main";
import RegisterPage from "./components/ResponsiveWebsite/components/pages/RegisterPage";
import LoginPage from "./components/ResponsiveWebsite/components/pages/LoginPage";
import Posts from "./components/ResponsiveWebsite/components/Posts/Posts";
import { AdminRoute, UserRoute } from "./components/ResponsiveWebsite/ProtectedRouter";
import { useLoginStore } from "./components/ResponsiveWebsite/store/authStore";
import { useEffect } from "react";
import LoginRoute from "./components/ResponsiveWebsite/LoginRouter";
import Bookmark from "./components/ResponsiveWebsite/components/pages/Bookmark";
import NavBar from "./components/ResponsiveWebsite/components/navbar/NavBarLarge";
import News from "./components/ResponsiveWebsite/components/pages/News";

function App() {
  const isLogin = useLoginStore((state) => state.isLogin)
  const getLogin = useLoginStore((state) => state.getLogin)
  const getType = useLoginStore((state) => state.getType)
  useEffect(() => {
    console.log(isLogin)
    getLogin()
    getType()
    console.log(isLogin)
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/demoProject" element={<DemoProject />} />
          <Route path="/msf" element={<MultiStepForm />} />
          <Route path="/ts" element={<TanStack />} />
          <Route path="/zs" element={<ZuStand />} />

          <Route path="auth" element={<LoginRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="" element={<Navigate to="/auth/register" />} />
          </Route>
          <Route element={<NavBar/>}>
            <Route path="" element={<Main />} />
            <Route path="user" element={<UserRoute />}>
            <Route path="post/:id" element={<Posts />} />
              <Route path="bookmark" element={<Bookmark />} />
              <Route path="about" element={"you are in About Page"} />
              <Route path="news" element={<News/>} />
              <Route path="*" element={<Navigate to="/auth/register" />} />
            </Route>
            <Route path="admin" element={<AdminRoute />}>
              <Route path="post/:id" element={<Posts />} />
              <Route path="bookmark" element={<Bookmark />} />
              <Route path="events" element={"you are in Event Page"} />
              <Route path="members" element={"you are in Member Page"} />
              <Route path="contact" element={"you are in Contact Page"} />
              <Route path="*" element={<Navigate to="/auth/register" />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/auth/register" />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
