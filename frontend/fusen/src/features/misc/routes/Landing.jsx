import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
			<div className="min-h-screen bg-base-200">
				<div className=" flex flex-col lg:flex-row min-h-screen">
					<div className="flex-1 px-8 py-10 flex flex-col justify-center">
						<h1 className="mb-5 text-5xl font-bold md:whitespace-nowrap">
							<span>こんにちは,</span>
							<span className="accent-title bg-white px-2">FUSEEN</span>
							<span>です</span>
						</h1>
						<p className="mb-5 text-lg">
							<span className="font-semibold">FUSEENはちょっとしたタスクを管理するためのツールです</span>
							<br/>もしかしたら次のようなときに役立つかもしれません
						</p>
						<ul className="list-disc ps-10">
							<li>コラボレーションツールで管理するまでもない、細かいタスクをどうにかしたい</li>
							<li>いくつかのプロジェクトを横断したちょうどいいタスク管理ツールを求めている</li>
							<li>趣味のプロジェクトだけど状態はちょっと管理したい</li>
							<li>notionの多機能さに挫折した</li>
							<li>カンバン、アイゼンハワーマトリクスを手軽に使ってみたい</li>
						</ul>
						<p className="mt-5">
							<span className="text-lg underline underline-offset-4">もしよかったら使ってみてください</span>
							<span className="text-xl">🐕🐢🐓</span>
						</p>
						<div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-12">
							<Link className="btn btn-primary" to="/login">
								ログイン
								<span className="material-icons-outlined">login</span>
							</Link>
							<Link className="btn btn-outline" to="/register">
								新規登録
								<span className="material-icons-outlined">person_add</span>
							</Link>
						</div>
					</div>

					<div className="flex-1 py-10 lg:py-20 flex flex-col justify-center items-center">
						{/* <img src="/images/board.png" className="max-w-[60vw] rounded-lg shadow-2xl origin-top-left -t -rotate-12 translate-x-36 skew-y-6" /> */}
						<img src="/images/board.png" className="max-w-[90%] lg:max-w-[60vw] rounded-lg shadow-2xl origin-top-left lg:translate-x-36" />
						<Link className="btn btn-accent w-[50%] mt-10" to="/board">
							ちょっと触ってみる
							<span className="material-icons-outlined">rocket_launch</span>
						</Link>
					</div>

				</div>
			</div>

			{/* <div className="hero min-h-screen" style={{backgroundImage: 'url(/images/board.png)'}}>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold"><span className="accent-title">FUSEEN</span> です！</h1>
						<p className="mb-5">fuseenはタスクを管理するためのツールです。以下のようなときに役立つかもしれません。</p>
						<ul>
							<li>コラボレーションツールで管理するまでもない、細かいタスクが多すぎる。どうにかしたい。</li>
							<li>コラボレーションツールで管理されてるけど複数案件抱えてて今日何をやんないといけないのか、すぐに分からない。毎日ヌケモレに不安になっている</li>
							<li>突発的な個人的タスクをいつも忘れる。スマホのtodoリストやメモ帳には書いてるけど優先度不明で化石化する</li>
							<li>アイゼンハワーマトリクスを手軽に使ってみたい</li>
						</ul>
						<Link to="/login">ログインはこちら</Link>
						<Link to="/register">新規登録はこちら</Link>
						<Link to="/board">デモはこちら</Link>
						<button className="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div> */}


    </>
  );
}

export default Landing;
