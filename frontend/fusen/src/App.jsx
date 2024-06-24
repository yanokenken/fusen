// import { AppProvider } from '@/providers/app';

import React, { useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { AppRoutes } from './routes';
import Cookies from "js-cookie";
import { RecoilRoot } from 'recoil';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { preferenceState, userState, fusensState, loadingState } from "./state/atoms";

import { getUser } from "./features/auth/api/getUser";
import { getFusens,getKanryoFusens } from "./features/fusen/api/getFusens"
import { getPreference } from './features/preference/api/getPreference';

import Toast from "./components/Toast";
import Loader from "./components/Loader";

function InnerApp() {
  const setUser = useSetRecoilState(userState);  
  const [preference, setPreference] = useRecoilState(preferenceState);
  const setFusens = useSetRecoilState(fusensState);
  const setLoading = useSetRecoilState(loadingState);
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('data-theme', preference.theme);
    }
  }, [preference.theme]);  

  useEffect(() => {
    // リロード時、ログインしている場合はuser情報を再取得
    const jwt = Cookies.get("auth");

    if (jwt) {
      (async () => {
        try {
          console.log('InnerApp:getUser')
          setLoading(true);
          const user = await getUser();
          const preference = await getPreference();
          setUser(user.data);
          setPreference({...preference, mode: "normal", title: "FUSEEN", theme: preference.theme});
          const fusens = await getFusens();
          const kanryoFusens = await getKanryoFusens();
          // 3秒待機
          await new Promise(resolve => setTimeout(resolve, 3000));
          // fusensとkanryoFusensがセットできたらloadingをfalseにする
          await setLoading(false);
          setFusens(fusens.concat(kanryoFusens));

        } catch (err) {
          setUser(null);
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
      <Toast />
      <Loader />
      <InnerApp />
    </RecoilRoot>
  );
}

export default App;