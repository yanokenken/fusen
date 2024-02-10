import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from "recoil";
import { preferenceState } from "../../state/atoms";
import { sideContentState } from '../../state/atoms';
import Menu from "../../features/misc/components/Menu";




function ContentLayout({children}) {

	const clildElements = React.Children.toArray(children);
	const preference = useRecoilValue(preferenceState);
	const [sideContent, setSideContent ] = useRecoilState(sideContentState);
	const sideOpen = () => setSideContent({open:true})
	const sideClose = () => setSideContent({open:false})


  return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={sideContent.open} onChange={() => {}} />
			<div className="drawer-content flex flex-col items-center justify-center">
				{/* sp表示時の付箋追加ボタン start */}
				<div className="fixed bottom-2 right-4 z-10 lg:hidden">
					<label htmlFor="my-drawer-2" className="btn btn-primary btn-circle btn-md" onClick={sideOpen}>
						<span className="material-icons">add</span>
					</label>
				</div>
				{/* sp表示時の付箋追加ボタン end */}
				
				{/* スマホ時のアプリロゴ */}
				<div className="min-h-screen h-fill-available w-full p-4  flex flex-col">
					<p className="accent-title text-accent my-[-16px] w-full text-center lg:hidden">
						{preference.title}
						<span className="text-[1.5rem] text-white"> Alpha</span>
					</p>
					
					{/* メインコンテンツエリア */}
					<div className='absolute right-2 flex items-center justify-center'><Menu /></div>
					
					{clildElements[0]}

	      </div>
			</div> 

			{/* サイドコンテンツエリア */}
			<div className="drawer-side min-h-dvh h-fill-available z-20">
			<label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
        onClick={sideClose}
      ></label>
      <div className="w-96 lg:w-64 xl:w-80">

        <div className="px-4 pb-4  h-dvh bg-base-300 overflow-x-auto always-show-scrollbar">
					{/* pc時のアプリロゴ */}
					<p className="accent-title text-accent m-auto w-full text-center hidden lg:block relative">
            {preference.title}
            <span className="text-[1.5rem] text-white absolute bottom-2 right-0 flex items-center justify-center"> Alpha</span>
          </p>
					{/* サイドコンテンツ */}
					{clildElements[1]}
        </div>
      </div>


			</div>
		</div>
	);
}

export default ContentLayout
