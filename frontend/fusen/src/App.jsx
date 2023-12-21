// import { AppProvider } from '@/providers/app';
import {BrowserRouter as Router} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from './routes';
import { RecoilRoot } from 'recoil';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { settingsState, userState } from "./state/atoms";
import { getUser } from "./features/auth/api/getUser";
import Cookies from "js-cookie";

function InnerApp() {

  const [user, setUser] = useRecoilState(userState);  
  const [settings, setSettings] = useRecoilState(settingsState);

  useEffect(() => {
    // リロード時、ログインしている場合はuser情報を再取得
    const jwt = Cookies.get("auth");

    if (jwt) {
      getUser().then((res) => {
        setUser(res.data);
        setSettings({...settings, mode: "normal", title: "FUSEEN" });
      }).catch((err) => {
        alert("認証情報が無効です。再度ログインしてください。");
        Cookies.remove("auth");
        setUser(null);
        setSettings({...settings, mode: "mock", title: "PREVIEW" });
      });
    }
  }, []);


  return (
      <Router>
        <AppRoutes />
      </Router>
  );
}

function App() {
  return (
    <RecoilRoot>
      <InnerApp />
    </RecoilRoot>
  );
}

export default App;