import { Link } from "react-router-dom";
import LoginModal from "../../auth/routes/LoginModal";
function Landing() {
  return (
    <>
      <div className="min-h-screen bg-base-200 overflow-hidden">
        <div className=" flex flex-col lg:flex-row min-h-screen">
          <div className="flex-1 px-8 py-10 flex flex-col justify-center">
            <h1 className="mb-5 text-5xl sm:text-4xl font-bold">
              <span className="md:inline-block inline-block md:whitespace-nowrap whitespace-normal">こんにちは,</span>
              <span className="accent-title bg-white p-2 md:inline-block inline-block md:whitespace-nowrap whitespace-normal">FUSEEN</span>
              <span className="md:inline-block inline-block md:whitespace-nowrap whitespace-normal">です</span>
            </h1>
            <p className="mb-5 text-lg">
              <span className="font-semibold">
                FUSEEN（フセーン）はちょっとしたタスクを管理するためのツールです
              </span>
              <br />
              もしかしたら次のようなときに役立つかもしれません
            </p>
            <ul className="list-disc ps-10">
              <li>
                コラボレーションツールで管理するまでもない、細かいタスクをどうにかしたい
              </li>
              <li>
                いくつかのプロジェクトを横断したちょうどいいタスク管理ツールを求めている
              </li>
              <li>趣味のプロジェクトだけど状態はちょっと管理したい</li>
              <li>notionの多機能さに挫折した</li>
              <li>カンバン、アイゼンハワーマトリクスを手軽に使ってみたい</li>
            </ul>
            <p className="mt-6">
              <span className="text-md ">
                もしよかったら使ってみてください
              </span>
              <span className="text-xl">🐕🐢🐓</span>
            </p>
            <div className="grid grid-cols-1 gap-8 mt-12 mx-auto">
							<label htmlFor="login_modal" className="btn btn-primary w-[10rem]">はじめる</label>
            </div>
          </div>

          <div className="flex-1 py-10 lg:py-20 flex flex-col justify-center items-center">
            {/* <img src="/images/board.png" className="max-w-[60vw] rounded-lg shadow-2xl origin-top-left -t -rotate-12 translate-x-36 skew-y-6" /> */}
            <img
              src="/images/board.png" alt="board"
              className="max-w-[90%] lg:max-w-[60vw] rounded-lg shadow-2xl origin-top-left lg:translate-x-36"
            />
            <Link className="btn btn-accent mt-10" to="/board">
              ちょっと触ってみる
              <span className="material-icons-outlined">rocket_launch</span>
            </Link>
          </div>
        </div>
      </div>
			<LoginModal />
    </>
  );
}

export default Landing;
