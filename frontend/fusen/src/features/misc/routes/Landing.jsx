import { Link } from "react-router-dom";
import LoginModal from "../../auth/routes/LoginModal";
import RegisterModal from "../../auth/routes/RegisterModal";
function Landing() {
  return (
    <>
      <div className="min-h-screen bg-base-200 overflow-hidden">
        <div className=" flex flex-col lg:flex-row min-h-screen">

          <div className="flex-1 px-8 py-10 flex flex-col justify-center items-center">
            <h1 className="mb-5 text-5xl sm:text-4xl font-bold">
              <span className="md:inline-block inline-block md:whitespace-nowrap whitespace-normal">こんにちは,</span>
              <span className="accent-title text-accent bg-white p-2 md:inline-block inline-block md:whitespace-nowrap whitespace-normal">FUSEEN</span>
              <span className="md:inline-block inline-block md:whitespace-nowrap whitespace-normal">です</span>
            </h1>
            <p className="mb-5 text-lg">
              <span className="font-semibold">
                FUSEEN（フセーン）は手元のタスクを管理するためのツールです
              </span>
            </p>
            <p className="mb-5 text-md">
              もしかしたら次のようなときに役立つかもしれません
            </p>
            <ul className="list-disc ps-10 leading-loose">
              <li>
                個人タスクを管理しているメモ帳データが増えすぎてつらい
              </li>
              <li>
                コラボレーションツールで管理するまでもない、細かいタスクをどうにかしたい
              </li>
              <li>
                いくつかのプロジェクトを横断したちょうどいいタスク管理ツールを求めている
              </li>
              <li>趣味のプロジェクトだけど状態はちょっと管理したい</li>
              <li>流行りの高機能なツールが使いこなせない</li>
            </ul>
            <p className="mt-6">
              <span className="text-md ">
                よかったら使ってみてください
              </span>
              <span className="text-xl">🐕🐢🐓</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mx-auto">
							<label htmlFor="login_modal" className="btn btn-outline btn-primary w-[10rem]">ログイン</label>
							<label htmlFor="register_modal" className="btn btn-primary w-[10rem]">新規登録はこちら</label>
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

            <Link className="btn btn-ghost btn-outline btn-primary  mt-10" to="/board">
              ちょっと触ってみる
              <span className="material-icons-outlined">rocket_launch</span>
            </Link>
          </div>
        </div>
      </div>
			<LoginModal />
      <RegisterModal />
    </>
  );
}

export default Landing;
