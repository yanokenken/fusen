import React, { useState } from 'react';
import { useRecoilValue } from "recoil";
import { settingsState } from "../../state/atoms";




function ContentLayout({children}) {

	const clildElements = React.Children.toArray(children);
	const settings = useRecoilValue(settingsState);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false); // サイドコンテンツエリアの表示状態
	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

  return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={() => {}} />
			<div className="drawer-content flex flex-col items-center justify-center">
				{/* メインコンテンツエリア */}
				{/* sp表示時の付箋追加ボタン start */}
				<div className="fixed bottom-2 right-4 z-10 lg:hidden">
					<label htmlFor="my-drawer-2" className="btn btn-primary btn-circle btn-md" onClick={openDrawer}>
						<span className="material-icons">add</span>
					</label>
				</div>
				{/* sp表示時の付箋追加ボタン end */}
				
				<div className="min-h-screen h-fill-available w-full p-4  flex flex-col">
					<p className="accent-title text-accent my-[-16px] w-full text-center lg:hidden">
						{settings.title}
						<span className="text-[1.5rem] text-white"> Alpha</span>
					</p>
					
					{clildElements[0]}

	      </div>
			</div> 
			{/* サイドコンテンツエリア（常時新規登録用の内容を表示） */}
			<div className="drawer-side min-h-dvh h-fill-available z-20">
			<label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
        onClick={closeDrawer}
      ></label>
      <div className="w-96 lg:w-64 xl:w-80">
        <div className="px-4 pb-4  h-dvh bg-base-300 overflow-x-auto always-show-scrollbar">
          <p className="accent-title text-accent m-auto w-full text-center hidden lg:block relative">
            {settings.title}
            <span className="text-[1.5rem] text-white absolute bottom-2 right-0 flex items-center justify-center"> Alpha</span>
          </p>
					{clildElements[1]}
        </div>
      </div>


			</div>
		</div>
	);
}

export default ContentLayout
