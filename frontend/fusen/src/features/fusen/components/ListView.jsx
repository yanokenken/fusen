import { useEffect, useState } from "react";
import { putFusenSortNo } from "../api/putFusen";
import { useRecoilState } from "recoil";
import { fusenStatusState } from "../../../state/atoms";

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import ListContainer from "./ListContainer";


function ListView({ fusens, onFusenClick }) {
  const [fusensState] = useRecoilState(fusenStatusState);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [allFusens, setAllFusens] = useState({
    fusens_1: [],
    fusens_2: [],
    fusens_3: [],
    fusens_4: [],      
  });
  useEffect(() => {
    if (fusens) {
      setAllFusens({
        fusens_1 : fusens.filter((fusen) => fusen.status === 0),
        fusens_2 : fusens.filter((fusen) => fusen.status === 1),
        fusens_3 : fusens.filter((fusen) => fusen.status === 2),
        fusens_4 : fusens.filter((fusen) => fusen.status === 3),
      });
    }
  }, [fusens]);


  return (
    <>
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-4 py-2 px-4 lg:h-tab-pc">
        <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
        >            
            <ListContainer id="fusens_1" statusLabel={fusensState[0]} fusens={allFusens.fusens_1} onFusenClick={onFusenClick} borderColor="border-warning" />
            <ListContainer id="fusens_2" statusLabel={fusensState[1]} fusens={allFusens.fusens_2} onFusenClick={onFusenClick} borderColor="border-secondary" />
            <ListContainer id="fusens_3" statusLabel={fusensState[2]} fusens={allFusens.fusens_3} onFusenClick={onFusenClick} borderColor="border-accent" />
            <ListContainer id="fusens_4" statusLabel={fusensState[3] + '（直近10件）'} fusens={allFusens.fusens_4} onFusenClick={onFusenClick} borderColor="border-default" />
        </DndContext>
      </div>
    </>
  );

  function findContainerId(id) {
    return Object.keys(allFusens).find((key) =>
      allFusens[key].find((fusen) => fusen.id === id)
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    // 処理対象のlistContainerでソートする
    const activeContainerId = findContainerId(active.id);
    
    if (active.id !== over.id) {
      setAllFusens((prevAllFusens) => {
        const oldIndex = prevAllFusens[activeContainerId].findIndex((fusen) => fusen.id === active.id);
        const newIndex = prevAllFusens[activeContainerId].findIndex((fusen) => fusen.id === over.id);
        let newList =  arrayMove(prevAllFusens[activeContainerId], oldIndex, newIndex);
        return {...prevAllFusens, [activeContainerId]: newList};
      });
      putFusenSortNo(active.id, over.id);
    }

  }

}
export default ListView;
