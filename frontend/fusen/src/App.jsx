// import { AppProvider } from '@/providers/app';

import React, { useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { AppRoutes } from './routes';
import Cookies from "js-cookie";
import { RecoilRoot } from 'recoil';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { settingsState, userState, fusensState } from "./state/atoms";

import { getUser } from "./features/auth/api/getUser";
import { getFusens} from "./features/fusen/api/getFusens"


function InnerApp() {
  const setUser = useSetRecoilState(userState);  
  const [settings, setSettings] = useRecoilState(settingsState);
  const setFusens = useSetRecoilState(fusensState);

  useEffect(() => {
    // リロード時、ログインしている場合はuser情報を再取得
    const jwt = Cookies.get("auth");

    if (jwt) {
      (async () => {
        try {
          const user = await getUser();
          setUser(user.data);
          setSettings({...settings, mode: "normal", title: "FUSEEN" });
          const fusens = await getFusens();
          setFusens(fusens);
        } catch (err) {
          setUser(null);
          setSettings({...settings, mode: "mock", title: "PREVIEW" });
          setFusens([]);
        }
      })();
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