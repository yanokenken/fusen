import React, { useState, useEffect } from 'react';
import Tab from '../components/Tab';
import CreateFusen from '../components/CreateFusen';

function Board(isDemo) {

	const [isDrawerOpen, setIsDrawerOpen] = useState(false); // サイドコンテンツエリアの表示状態
	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

  return (
		<div className="drawer xl:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={() => {}} />
			<div className="drawer-content flex flex-col items-center justify-center">
				{/* メインコンテンツエリア */}
				{/* sp表示時の付箋追加ボタン start */}
				<div className="fixed bottom-2 right-4 z-10 xl:hidden">
					<label htmlFor="my-drawer-2" className="btn btn-primary btn-circle btn-md" onClick={openDrawer}>
						<span className="material-icons">add</span>
					</label>
				</div>
				{/* sp表示時の付箋追加ボタン end */}
				<Tab />
			</div> 
			{/* サイドコンテンツエリア（常時新規登録用の内容を表示） */}
			<div className="drawer-side min-h-screen h-fill-available z-20">
				<CreateFusen closeDrawer={closeDrawer} />
			</div>
		</div>
	);
}

export default Board
