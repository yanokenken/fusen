import { useEffect, useState } from "react";
import DetailedFusen from "./DetailedFusen";
import Fusen from "./Fusen";

function MatrixView({ fusens, onFusenClick }) {
  const [fusens_1, setFusens_1] = useState([]);
  const [fusens_2, setFusens_2] = useState([]);
  const [fusens_3, setFusens_3] = useState([]);
  const [fusens_4, setFusens_4] = useState([]);

  //今日の日付(時間は含まない)
  const today = new Date(new Date().toLocaleDateString());

  const isRemaind = (remaind_at) => {
    // 付箋のリマインド日付(時間は含まない)
    const remaindDate = new Date(new Date(remaind_at).toLocaleDateString());

    // かつ今日>=remaind_atの場合true
    return today >= remaindDate;
  };

  // fusenのリマインドソート
  const fusenSort = (fusens) => {
    fusens.sort((a, b) => {
      if (isRemaind(a.remaind_at) && !isRemaind(b.remaind_at)) {
        return -1;
      } else if (!isRemaind(a.remaind_at) && isRemaind(b.remaind_at)) {
        return 1;
      }
      return 0;
    });
    return fusens;
  };

  // fusensをstatusでフィルタリング
  useEffect(() => {
    if (fusens) {
      // fusensが定義されていることを確認
      const fusens_1 = fusens.filter(
        (fusen) =>
          fusen.is_important === true &&
          fusen.is_urgent === true &&
          fusen.status !== 3
      );
      setFusens_1(fusenSort(fusens_1));
      const fusens_2 = fusens.filter(
        (fusen) =>
          fusen.is_important === true &&
          fusen.is_urgent === false &&
          fusen.status !== 3
      );
      setFusens_2(fusenSort(fusens_2));
      const fusens_3 = fusens.filter(
        (fusen) =>
          fusen.is_important === false &&
          fusen.is_urgent === true &&
          fusen.status !== 3
      );
      setFusens_3(fusenSort(fusens_3));
      const fusens_4 = fusens.filter(
        (fusen) =>
          fusen.is_important === false &&
          fusen.is_urgent === false &&
          fusen.status !== 3
      );
      setFusens_4(fusenSort(fusens_4));
    }
  }, [fusens]);

  return (
    <>
      <div
        className="
						lg:h-tab-sp 
						xl:h-tab-pc 
						w-full grid 
						md:grid-rows-2 
						md:grid-cols-2 
						sm:grid-cols-1
						xs:grid-cols-1
						"
      >
        <div className="overflow-auto h-[calc((100vh - 50px) / 2 - 1rem)] md:border-b md:border-r border-color-gray p-2">
          <div className="">
            <div className="badge w-full ">1 重要かつ緊急</div>
            <div
              className="grid gap-x-4 m-2
                  xl:grid-cols-2 
                  md:grid-cols-2 
                  sm:grid-cols-1
                  overflow-auto"
            >
              {fusens_1.map((fusen) => (
                <Fusen
                  key={fusen.id}
                  fusen={fusen}
                  onClick={() => onFusenClick(fusen)}
                  isRemaind={isRemaind(fusen.remaind_at)}
                  fusenColor={
                    isRemaind(fusen.remaind_at) ? "bg-base-100" : "bg-base-100"
                  }
                  titleColor={isRemaind(fusen.remaind_at) ? "text-error" : ""}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px) / 2 - 1rem)] md:border-b border-color-gray p-2">
          <div className="">
            <div className="badge w-full">2 重要だが緊急ではない</div>
            <div
              className="grid gap-4 m-2 
                xl:grid-cols-2
                md:grid-cols-2
                sm:grid-cols-1
                overflow-auto"
            >
              {fusens_2.map((fusen) => (
                <Fusen
                  key={fusen.id}
                  fusen={fusen}
                  onClick={() => onFusenClick(fusen)}
                  isRemaind={isRemaind(fusen.remaind_at)}
                  fusenColor={
                    isRemaind(fusen.remaind_at) ? "bg-base-100 " : "bg-base-100"
                  }
                  titleColor={isRemaind(fusen.remaind_at) ? "text-error" : ""}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px) / 2 - 1rem)] md:border-r border-color-gray p-2">
          <div className="">
            <div className="badge w-full">3 重要ではないが緊急</div>
            <div
              className="grid gap-4 m-2 
									xl:grid-cols-2 
									md:grid-cols-2 
									sm:grid-cols-1
									overflow-auto"
            >
              {fusens_3.map((fusen) => (
                <Fusen
                  key={fusen.id}
                  fusen={fusen}
                  onClick={() => onFusenClick(fusen)}
                  isRemaind={isRemaind(fusen.remaind_at)}
                  fusenColor={
                    isRemaind(fusen.remaind_at) ? "bg-base-100 " : "bg-base-100"
                  }
                  titleColor={isRemaind(fusen.remaind_at) ? "text-error" : ""}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px) / 2 - 1rem)] border-color-gray p-2">
          <div className="">
            <div className="ps-2 badge w-full">4 重要でも緊急でもない</div>
            <div
              className="grid gap-4 m-2 
                xl:grid-cols-2 
                md:grid-cols-2 
                sm:grid-cols-1 
                overflow-auto"
            >
              {fusens_4.map((fusen) => (
                <Fusen
                  key={fusen.id}
                  fusen={fusen}
                  onClick={() => onFusenClick(fusen)}
                  isRemaind={isRemaind(fusen.remaind_at)}
                  fusenColor={
                    isRemaind(fusen.remaind_at) ? "bg-base-100 " : "bg-base-100"
                  }
                  titleColor={isRemaind(fusen.remaind_at) ? "text-error" : ""}

                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatrixView;
