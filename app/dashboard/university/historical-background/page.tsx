"use client";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../../Main";

function HistoricalBackground() {
  const dispatch = useAppDispatch();

  // const { news } = useNews();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // (() => dispatch(fetchNews()))();
  }, [dispatch]);

  useEffect(() => {
    if (open === false) {
      /// dispatch(setCurrentNews(null));
    }
  }, [open]);

  async function editNews(id: string) {
    setOpen(true);
    //  dispatch(setCurrentNews(id));
  }

  return (
    <>
      <Header title="News">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add News
        </button>
      </Header>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add New College"
        width="max-w-full"
      >
        <NewsForm setClose={setOpen} />
      </Modal>

      <Main>
        <div className="overflow-x-auto ">
          <table className="table-auto w-full ">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Name</th>
                <th className="p-2 font-semibold text-left">Code</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {news.map((nw, x) => (
                <tr key={nw.id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">{nw?.titleEn}</td>
                  <td className="p-2">{nw?.titleAr}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <button className="group" onClick={() => editNews(nw.id)}>
                        <PencilSquareIcon className="w-6 h-6 transform transition-all group-hover:scale-110 text-gray-500 hover:text-gray-900" />
                      </button>
                      {/* <DeleteNews id={nw.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Main>
    </>
  );
}

export default HistoricalBackground;
