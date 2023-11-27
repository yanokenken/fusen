import FusenModal from "./FusenModal";
import MatrixView from "./MatrixView";

function Tab(props) {
  const { tabList, activeTab, onClickTab } = props;

  return (
    <>
      <div className="min-h-screen w-full p-4  flex flex-col">
        <p className="accent-title mt-[-16px] w-full text-center lg:hidden">
          FUSEEN
        </p>
        <div className="flex justify-between">
          <div className="tabs tabs-boxed bg-base-300 mb-2">
            <a className="tab tab-md tab-active bg-accent">表</a>
            <a className="tab tab-md ">リスト</a>
            <a className="tab tab-md">完了</a>
          </div>
          <div className="avatar">
            <div className="w-10 h-10 rounded-full m-1">
              <img src="https://api.biz-axis.tk/img/5/image.jpg" />
            </div>
          </div>
        </div>
        <div className="tab-body bg-base-200 w-full flex-grow rounded-xl shadow-center">
					<MatrixView />
        </div>

      </div>
      <FusenModal
        modalId="shosai_modal"
        title="〇〇を✗✗する"
        memo="xx日までに終わらせよう"
      />
    </>
  );
}

export default Tab;
