import { useState, useEffect } from "react";
import LoginModal from "../../auth/routes/LoginModal";
import { putConfirm } from "../api/putConfirm";
function Confirm() {


	const [message, setMessage] = useState("メールアドレスの確認中です...");

	useEffect(() => {
		emailConfirm();
	}, []);

	// メール確認処理
	const emailConfirm = () => {
		// urlからtokenを取得
		const url = new URL(window.location.href);
		const token = url.searchParams.get("token");
		console.log(token);

		putConfirm(token)
			.then((res) => {
				console.log(res);
				setMessage("メールアドレスの確認が完了しました。ログインしてください");
			}).catch((error) => {
				if (error.response) {
					console.log(error.response.data);
					alert(error.response.data);
				} else {
					console.log("Error", error.message);
					alert(error.message);
				}
				setMessage("メールアドレスの確認に失敗しました。メールに記載されたURLを再度クリックしてください");
			});
		};



  return (
    <>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">登録ありがとうございます！</h1>
						<p className="py-6">{message}</p>
						<label htmlFor="login_modal" className="btn btn-outline btn-primary w-[10rem]">ログイン</label>
					</div>
				</div>
			</div>
			<LoginModal />
    </>
  );
}


export default Confirm;
