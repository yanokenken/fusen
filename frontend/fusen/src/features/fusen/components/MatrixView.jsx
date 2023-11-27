import Fusen from "./Fusen";
function MatrixView() {
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
        <div className="overflow-auto h-[calc((100vh - 50px)/2 - 1rem)] md:border-r md:border-b border-color-gray">
          <div className="">
            <div className="ps-2">1 重要かつ急ぎ</div>
            <div
              className="grid gap-3 m-2 
									xl:grid-cols-3 
									md:grid-cols-2 
									sm:grid-cols-1 									
									overflow-auto"
            >
              <Fusen fusenColor="fusen3" isKyoju="1" />
              <Fusen fusenColor="fusen3" isKyoju="1" />
              <Fusen fusenColor="fusen3" isKyoju="1" isSinkochu="1" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px)/2 - 1rem)] md:border-b border-color-gray">
          <div className="">
            <div className="ps-2">2 重要だが急ぎではない</div>
            <div
              className="grid gap-3 m-2 
									xl:grid-cols-3 
									md:grid-cols-2 
									sm:grid-cols-1 									
									overflow-auto"
            >
              <Fusen fusenColor="fusen3" isKyoju="1" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px)/2 - 1rem)] md:border-r border-color-gray">
          <div className="">
            <div className="ps-2">3 急ぎだが重要ではない</div>
            <div
              className="grid gap-3 m-2 
									xl:grid-cols-3 
									md:grid-cols-2 
									sm:grid-cols-1 									
									overflow-auto"
            >
              <Fusen fusenColor="fusen3" isKyoju="1" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[calc((100vh - 50px)/2 - 1rem)] border-color-gray">
          <div className="">
            <div className="ps-2">4 重要でも急ぎでもない</div>
            <div
              className="grid gap-3 m-2 
									xl:grid-cols-3 
									md:grid-cols-2 
									sm:grid-cols-1 									
									overflow-auto"
            >
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
              <Fusen fusenColor="fusen3" isKyoju="0" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatrixView;
