import React, { useEffect } from "react";
import LoginModal from "../../auth/routes/LoginModal";
import RegisterModal from "../../auth/routes/RegisterModal";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { preferenceState, userState } from "../../../state/atoms";


function Landing() {
  const [preference, setPreference] = useRecoilState(preferenceState);
  const [user, setUser] = useRecoilState(userState);  

  const navigate = useNavigate();

  const playMock = () => {
    setUser({...user, name:"お試し太郎", });
    setPreference({...preference, mode: "mock", title: "PREVIEW" });
    navigate("/demo");
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 overflow-hidden">
        <div className=" flex flex-col lg:flex-row min-h-screen">

          <div className="flex-1 px-8 py-10 flex flex-col justify-center items-center">
            <h1 className="mb-5 text-5xl sm:text-4xl font-bold">
              <span className="md:inline-block inline-block md:whitespace-nowrap whitespace-normal">こんにちは,　</span>
              <span className="accent-title text-accent bg-white p-2 md:inline-block inline-block md:whitespace-nowrap whitespace-normal">FUSEEN</span>
              <span className="ps-2 md:inline-block inline-block md:whitespace-nowrap whitespace-normal">です</span>
            </h1>
            <p className="mb-5 text-lg">
              <span className="font-semibold">
                FUSEEN（フセーン）は手元のタスクをフセンで管理するためのツールです
              </span>
            </p>
            <p className="mb-5 text-md">
              「ただただフセンをカンバンボードっぽい感じでどこでも使えるようにしたい！」という気持ちで作られました。
            </p>
            <p className="mb-5 text-md">
              機能はシンプルで、書いて貼って動かして剥がすだけです。
            </p>
            <ul className="list-disc ps-10 leading-loose">

            </ul>
            <p className="mt-6">
            <span className="text-md ">
                よかったら使ってみてください
              </span>
              <span className="text-xl">🐕🐢🐓</span>
            </p>
            <div className="flex justify-center mt-8">
              <div className="alert alert-warning">
                <span>※現在はベータ版として公開しています。</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mx-auto">
							<button className="btn btn-outline btn-primary w-[10rem]" onClick={()=>{document.getElementById('login_modal').showModal()}}>ログイン</button>
							<button className="btn btn-primary w-[10rem]" onClick={()=>{document.getElementById('register_modal').showModal()}}>新規登録はこちら</button>
            </div>
          </div>

          <div className="flex-1 py-10 lg:py-20 flex flex-col justify-center items-center origin-top-left lg:translate-x-36">
            {/* <img src="/images/board.png" className="max-w-[60vw] rounded-lg shadow-2xl origin-top-left -t -rotate-12 translate-x-36 skew-y-6" /> */}
            <div className="mockup-window bg-base-100 shadow-2xl hidden lg:block">
              <img
                src="/images/board.png" alt="board"
                className=" max-w-[90%] lg:max-w-[60vw]"
              />
            </div>

            <img
                src="/images/board.png" alt="board"
                className=" block lg:hidden max-w-[90%] rounded-lg"
              />

            {/* <label className="btn btn-ghost btn-outline btn-primary  mt-10" onClick={playMock}>
              ちょっと触ってみる
              <span className="material-icons-outlined">rocket_launch</span>
            </label> */}
          </div>
        </div>
      </div>
			<LoginModal />
      <RegisterModal />
    </>
  );
}

export default Landing;
