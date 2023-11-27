import Tab from '../components/Tab';
import CreateFusen from '../components/CreateFusen';

function FusenBoard() {
  return (
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* メインコンテンツエリア */}
		{/* sp表示時の付箋追加ボタン start */}
		<div className="fixed bottom-2 right-4 z-10 lg:hidden ">
			<label htmlFor="my-drawer-2" className="btn btn-primary btn-circle btn-md">
				<span className="material-icons">add</span>
			</label>
		</div>
		{/* sp表示時の付箋追加ボタン end */}

		<Tab />
  </div> 
	{/* サイドコンテンツエリア（常時新規登録用の内容を表示） */}
  <div className="drawer-side">
    <CreateFusen />      
  </div>
</div>
		);
}

export default FusenBoard
