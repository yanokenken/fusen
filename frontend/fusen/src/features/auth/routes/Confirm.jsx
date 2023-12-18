import { useState, useEffect } from "react";
import LoginModal from "../../auth/routes/LoginModal";
import { putConfirm } from "../api/putConfirm";
function Confirm() {


	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		emailConfirm();
	}, []);

	// メール確認処理
	const emailConfirm = () => {
		// urlからtokenを取得
		const url = new URL(window.location.href);
		const token = url.searchParams.get("token");

		putConfirm(token)
			.then((res) => {
				setIsSuccess(true)
			}).catch((error) => {
				setIsSuccess(false)
				if (error.response) {
					console.error(error.response.data);
				} else {
					console.error("Error", error.message);
				}
			});
		};



  return (
    <>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content text-center">
					<div className="">
					<p className="accent-title text-accent m-auto w-full text-center  pb-12">
			      FUSEEN
					</p>

						{isSuccess ?
						<>
							<h1 className="text-3xl font-bold">登録ありがとうございます。</h1>
							<p className="py-6 break-words whitespace-pre-wrap">
								メールアドレスの確認が完了しました。
								<br />
								そのままログインしてください
							</p>
							<label htmlFor="login_modal" className="btn btn-outline btn-primary w-[10rem]">ログイン</label>
						</>
						:
						<>
							<h1 className="text-3xl font-bold">メールアドレスの確認に失敗しました😢</h1>
							<p className="py-6 break-words whitespace-pre-wrap">
								メールに記載されたURLから再度アクセスしてください。
							</p>
						</>
						}
					</div>
				</div>
			</div>
			<LoginModal />
    </>
  );
}


export default Confirm;
