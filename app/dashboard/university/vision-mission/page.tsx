"use client";
import Header from "@/components/Header";
import { useAppDispatch } from "@/store";
import { fetchVisionMission, useVisionMission } from "@/store/university";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../../Main";

function VisionMission() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { visionMission, loading } = useVisionMission();

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
        <div className="w-full px-4">
          <div className="mx-auto w-full space-y-3  rounded-2xl bg-white p-2">
            {visionMission.map((vision) => (
              <Disclosure key={vision.id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-brand-100 px-4 py-2 text-left text-sm font-medium text-brand-900 hover:bg-brand-200 focus:outline-none focus-visible:ring focus-visible:ring-brand-500 focus-visible:ring-opacity-75">
                      <span>{vision?.titleAr}</span>
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
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}

export default VisionMission;
