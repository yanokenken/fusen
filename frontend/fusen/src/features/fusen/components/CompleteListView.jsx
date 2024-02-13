import { useEffect, useState } from "react";
import { getKanryoFusens } from "../api/getFusens";
import { useRecoilState } from "recoil";
import { fusensState } from "../../../state/atoms";

import ListContainer from "./ListContainer";



function CompleteListView({ onFusenClick }) {

	const [_fusens, _setFusens] = useState(null);
	const [fusens, setFusens] = useRecoilState(fusensState);

	const allKanryoFusens = async () => {
    const kanryoFusens = await getKanryoFusens('all');
		return kanryoFusens;
  }


	useEffect(() => {
		// 初回だけは完了再取得
		allKanryoFusens().then((res) => {			
			_setFusens(res);
		});
	}, []);

  useEffect(() => {
		// 更新された時は更新後再取得のデータを使う
    if (fusens) {
			_setFusens(fusens.filter((fusen) => fusen.status === 3))

    }
  }, [fusens]);

	if (!_fusens) {
		return <div>Loading...</div>;
	}
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-2 gap-6 py-2 px-4 lg:h-tab-pc">
				<ListContainer id="fusens_4" statusLabel="完了（全件）" fusens={_fusens} onFusenClick={onFusenClick} borderColor="border-default" isCompleteList={true}  />
      </div>
    </>
  );
}
export default CompleteListView;
