import { useEffect, useState } from "react";
import Fusen from "./Fusen";

function MatrixView({fusens, onFusenClick}) {
  const [fusens_1, setFusens_1] = useState([]);
  const [fusens_2, setFusens_2] = useState([]);
  const [fusens_3, setFusens_3] = useState([]);
  const [fusens_4, setFusens_4] = useState([]);




  // fusensをstatusでフィルタリング
  useEffect(() => {
    if (fusens) {
      // fusensが定義されていることを確認
      const fusens_1 = fusens.filter(
        (fusen) => fusen.isImportant === true && fusen.isUrgent === true
      );
      setFusens_1(fusens_1);
      const fusens_2 = fusens.filter(
        (fusen) => fusen.isImportant === true && fusen.isUrgent === false
      );
      setFusens_2(fusens_2);
      const fusens_3 = fusens.filter(
        (fusen) => fusen.isImportant === false && fusen.isUrgent === true
      );
      setFusens_3(fusens_3);
      const fusens_4 = fusens.filter(
        (fusen) => fusen.isImportant === false && fusen.isUrgent === false
      );
      setFusens_4(fusens_4);
    }
  }, [fusens]);

  return (
    <>
      <div
        className="
						md:h-tab-sp 
						lg:h-tab-pc 
						w-full grid 
						md:grid-rows-2 
						md:grid-cols-2 
						sm:grid-cols-1
						xs:grid-cols-1
						"
      >
        <div className="overflow-auto h-[calc((100vh - 50px) / 2 - 1rem)] md:border-b md:border-r border-color-gray">
          <div className="">
            <div className="ps-2 badge ">1 重要かつ緊急</div>
            <div
              className="grid gap-3 m-2 
                  xl:grid-cols-3 
                  md:grid-cols-2 
                  sm:grid-cols-1
                  overflow-auto"
            >
              {fusens_1.map((fusen) => (
                <Fusen
                  key={fusen.id}
                  fusen={fusen}
                  onClick={() => onFusenClick(fusen)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px) / 2 - 1rem)] md:border-b border-color-gray">
          <div className="">
            <div className="ps-2 badge ">2 重要だが緊急ではない</div>
            <div
              className="grid gap-3 m-2 
									xl:grid-cols-3 
									md:grid-cols-2 
									sm:grid-cols-1 									
									overflow-auto"
            >
              {fusens_2.map((fusen) => (
                <Fusen
                key={fusen.id}
                fusen={fusen}
                onClick={() => onFusenClick(fusen)}
              />
            ))}
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px) / 2 - 1rem)] md:border-r border-color-gray">
          <div className="">
            <div className="ps-2 badge ">3 重要ではないが緊急</div>
            <div
              className="grid gap-3 m-2 
									xl:grid-cols-3 
									md:grid-cols-2 
									sm:grid-cols-1 									
									overflow-auto"
            >
              {fusens_3.map((fusen) => (
                <Fusen
                key={fusen.id}
                fusen={fusen}
                onClick={() => onFusenClick(fusen)}
              />
            ))}
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px) / 2 - 1rem)] border-color-gray">
          <div className="">
            <div className="ps-2 badge ">4 重要でも緊急でもない</div>
            <div
              className="grid gap-3 m-2 
									xl:grid-cols-3 
									md:grid-cols-2 
									sm:grid-cols-1 
									overflow-auto"
            >
              {fusens_4.map((fusen) => (
                <Fusen
                key={fusen.id}
                fusen={fusen}
                onClick={() => onFusenClick(fusen)}
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
