"use client";
import Header from "@/components/Header";
import { useAppDispatch } from "@/store";
import {
  fetchVisionMission,
  sortItems,
  sortVisionMission,
  useVisionMission,
} from "@/store/university";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Disclosure } from "@headlessui/react";
import {
  Bars4Icon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
// import { useDrag } from "react-dnd";

import Main from "../../Main";
import { SortableItem } from "./SortableItem";

function VisionMission() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { visionMission, loading } = useVisionMission();

  // const [{ opacity }, dragRef] = useDrag(
  //   () => ({
  //     type: ItemTypes.CARD,
  //     item: { text },
  //     collect: (monitor) => ({
  //       opacity: monitor.isDragging() ? 0.5 : 1,
  //     }),
  //   }),
  //   []
  // );

  useEffect(() => {
    dispatch(fetchVisionMission());
  }, []);
  return (
    <>
      <Header title="News">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add New Vision & Mission
        </button>
      </Header>
      <Main>
        {/* <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={languages}
            strategy={verticalListSortingStrategy}
          >
            {languages.map((language) => (
              <SortableItem key={language} id={language}>
                <span>{language}</span>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext> */}
        <div className="w-full px-4">
          <div className="mx-auto w-full space-y-3  rounded-2xl bg-white p-2">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={visionMission}
                strategy={verticalListSortingStrategy}
              >
                {visionMission.map((vision) => (
                  <SortableItem key={vision.id} id={vision.id}>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-brand-100 px-4 py-2 text-left text-sm font-medium text-brand-900 hover:bg-brand-200 focus:outline-none focus-visible:ring focus-visible:ring-brand-500 focus-visible:ring-opacity-75">
                            <div className="flex items-center gap-3">
                              <Bars4Icon className="w-4 h-4 cursor-move" />
                              <span>{vision?.titleAr}</span>
                            </div>
                            <ChevronUpIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-brand-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {vision?.descriptionAr}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </Main>
    </>
  );

  function handleDragEnd(event: any) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      const activeIndex = visionMission.map((r) => r.id).indexOf(active.id);
      const overIndex = visionMission.map((r) => r.id).indexOf(over.id);

      console.log("ACTIVE Index: " + activeIndex);
      console.log("OVER  Index:" + overIndex);

      const items = arrayMove(visionMission, activeIndex, overIndex);

      dispatch(sortItems(items));

      const itemsAfterSort = items.map((item, x) => ({
        id: item.id,
        seqNo: x,
      }));

      dispatch(sortVisionMission(itemsAfterSort));
    }
  }
}

export default VisionMission;
