import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { preferenceState, sideContentState, menuState } from "../../state/atoms";

import LoginModal from "../../features/auth/routes/LoginModal";
import Menu from "../../features/misc/components/Menu";


function ContentLayout({children}) {

	const clildElements = React.Children.toArray(children);
	const preference = useRecoilValue(preferenceState);
	const [sideContent, setSideContent ] = useRecoilState(sideContentState);
	const [menu, setMenu] = useRecoilState(menuState);
	const sideOpen = () => setSideContent({open:true})
	const sideClose = () => setSideContent({open:false})


  return (
		<>
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" checked={sideContent.open} onChange={() => {}} />

			<div className="drawer-content items-center justify-center">
				{/* sp表示時の付箋追加ボタン start */}
				<div className="fixed bottom-2 right-4 z-10 lg:hidden">
					{menu.isPreferenceMode ?
						<label htmlFor="my-drawer-2" className="btn btn-primary btn-md rounded-full" onClick={sideOpen}>
							<span>その他の設定</span>
						</label>
						:
						<label htmlFor="my-drawer-2" className="btn btn-primary btn-circle btn-md" onClick={sideOpen}>
							<span className="material-icons">add</span>
						</label>
					}
				</div>
				{/* sp表示時の付箋追加ボタン end */}
				
				{/* スマホ時のアプリロゴ */}
				<div className="min-h-screen h-fill-available w-full p-4  flex flex-col">
					<Link to="/board" onClick={()=>setMenu({...menu, isPreferenceMode:false})} className="accent-title text-accent my-[-16px] w-full text-center lg:hidden">
						{preference.title}
						<span className="text-[1.5rem] text-white">Beta</span>
					</Link>
					
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
      <div className="w-full lg:w-64 xl:w-80">

        <div className="px-10 lg:ps-4 lg:pe-0 pb-4 bg-base-300 h-screen flex flex-col">
					{/* pc時のアプリロゴ */}
					<div className=" hidden lg:block h-[8vh] text-center">
						<Link to="/board" onClick={()=>setMenu({...menu, isPreferenceMode:false})} className="block accent-title text-accent relative">
							{preference.title}
							<span className="text-[1.5rem] text-white absolute bottom-2 right-4 flex items-center justify-center">Beta</span>
						</Link>
					</div>
					{/* サイドコンテンツ */}
					{clildElements[1]}
        </div>
      </div>
			</div>
		</div>
		<LoginModal />
		</>
	);
}

export default ContentLayout
