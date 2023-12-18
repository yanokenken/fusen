import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { login } from "../api/login"; 
import { getUser } from "../api/getUser";
import { useRecoilState } from "recoil";
import { settingsState, userState } from "../../../state/atoms";


function LoginModal(modalId) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useRecoilState(settingsState);
  const [user, setUser] = useRecoilState(userState);  

  const navigate = useNavigate();

  const _login = () => {
    login(email, password)
      .then((res) => {
        console.log(res);
        setSettings({...settings, mode: "normal", title: "FUSEEN" });
        // jwtをcookieに保存
        Cookies.set("auth", res.data, { path: "/", expires: 1 });
        // user情報を取得・state管理
        getUser().then((res) => {
          console.log('user: ',res);
          setUser(res.data);
        });



        navigate("/board");
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
          alert(error.message);
        }
      }
    );

  }

  return (
    <>
      <input type="checkbox" id="login_modal" className="modal-toggle" onChange={()=>{}} />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-center">
            <span className="font-bold text-lg px-2">fuseen</span>
          </h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mt-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mt-4"
          />
          <button type="submit" className="btn btn-primary w-full mt-4 " onClick={_login}>
            メールアドレスでログイン
          </button>
          <button className="btn w-full mt-4 " disabled="true">
            <svg viewBox="0 0 533.5 544.3" className="ms-0.5 w-[1rem]"><title>google-colored</title><path d="M533.5,278.4a320.07,320.07,0,0,0-4.7-55.3H272.1V327.9h147a126,126,0,0,1-54.4,82.7v68h87.7C503.9,431.2,533.5,361.2,533.5,278.4Z" fill="#4285f4"></path><path d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26-71,0-131.2-47.9-152.8-112.3H28.9v70.1A272.19,272.19,0,0,0,272.1,544.3Z" fill="#34a853"></path><path d="M119.3,324.3a163,163,0,0,1,0-104.2V150H28.9a272.38,272.38,0,0,0,0,244.4Z" fill="#fbbc04"></path><path d="M272.1,107.7a147.89,147.89,0,0,1,104.4,40.8h0l77.7-77.7A261.56,261.56,0,0,0,272.1,0,272.1,272.1,0,0,0,28.9,150l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7Z" fill="#ea4335"></path></svg>
            Googleアカウントでログイン（準備中）
          </button>
        </div>
        <label className="modal-backdrop" htmlFor="login_modal">Close</label>
      </div>
    </>
  );
}

export default LoginModal;
