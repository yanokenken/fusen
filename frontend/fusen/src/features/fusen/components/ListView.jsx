import { useEffect, useState } from "react";
import DetailedFusen from "./DetailedFusen";

function MatrixView({ fusens, onFusenClick }) {
  const [fusens_1, setFusens_1] = useState([]);
  const [fusens_2, setFusens_2] = useState([]);
  const [fusens_3, setFusens_3] = useState([]);
  const [fusens_4, setFusens_4] = useState([]);

  // fusensをstatusでフィルタリング
  useEffect(() => {
    if (fusens) {
      // fusensが定義されていることを確認
      const fusens_1 = fusens.filter((fusen) => fusen.status === 0);
      setFusens_1(fusens_1);
      const fusens_2 = fusens.filter((fusen) => fusen.status === 1);
      setFusens_2(fusens_2);
      const fusens_3 = fusens.filter((fusen) => fusen.status === 2);
      setFusens_3(fusens_3);
      const fusens_4 = fusens.filter((fusen) => fusen.status === 3);
      setFusens_4(fusens_4);
    }
  }, [fusens]);

  return (
    <>
      <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 py-2 px-4 md:h-tab-sp lg:h-tab-pc">
        <div className="overflow-auto">
          <div className="badge w-full">未着手</div>
          {fusens_1.map((fusen) => (
            <DetailedFusen
              key={fusen.id}
              fusen={fusen}
              onClick={() => onFusenClick(fusen)}
            />
          ))}
        </div>
        <div className="overflow-auto">
          <div className="badge w-full">進行中</div>
          {fusens_2.map((fusen) => (
            <DetailedFusen
              key={fusen.id}
              fusen={fusen}
              onClick={() => onFusenClick(fusen)}
            />
          ))}
        </div>
        <div className="overflow-auto">
          <div className="badge w-full ">今日やる！</div>
          {fusens_3.map((fusen) => (
            <DetailedFusen
              key={fusen.id}
              fusen={fusen}
              onClick={() => onFusenClick(fusen)}
            />
          ))}
        </div>
        <div className="overflow-auto">
          <div className="badge w-full ">完了</div>
          {fusens_4.map((fusen) => (
            <DetailedFusen
              key={fusen.id}
              fusen={fusen}
              onClick={() => onFusenClick(fusen)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MatrixView;
