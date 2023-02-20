"use client";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { useAppDispatch } from "@/store";
import { deleteCollege, fetchColleges, useCollege } from "@/store/college";
import {
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Main from "../Main";
import CollegeForm from "./CollegeForm";
import DeleteCollege from "./DeleteCollege";

function College() {
  const dispatch = useAppDispatch();

  const { colleges } = useCollege();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (() => dispatch(fetchColleges()))();
  }, [dispatch]);

  return (
    <>
      <Header title="Colleges">
        <button className="btn btn--primary mt-3" onClick={() => setOpen(true)}>
          <PlusIcon className="w-6 h-6" />
          Add new College
        </button>
      </Header>
      <Modal open={open} setOpen={setOpen}>
        <CollegeForm setClose={setOpen} />
      </Modal>

      <Main>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-600 bg-gray-100">
              <tr>
                <th className="p-2 font-semibold text-left">#</th>
                <th className="p-2 font-semibold text-left">Name</th>
                <th className="p-2 font-semibold text-left">Code</th>
                <th className="p-2 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {colleges.map((college, x) => (
                <tr key={college.id}>
                  <td className="p-2">{x + 1}</td>
                  <td className="p-2">{college?.nameEn}</td>
                  <td className="p-2">{college?.code}</td>
                  <td className="p-2">
                    <div>
                      <DeleteCollege id={college.id} />
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

export default College;
