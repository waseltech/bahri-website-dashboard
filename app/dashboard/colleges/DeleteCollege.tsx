"use client";
import { useAppDispatch } from "@/store";
import { deleteCollege } from "@/store/college";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function DeleteCollege({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const [idDelete, setIdDelete] = useState("");

  async function handleDelete(id: string) {
    if (confirm("sure you want to delete")) {
      setIdDelete(id);
      await dispatch(deleteCollege(id));
      setIdDelete("");
    }
  }
  return (
    <button
      onClick={() => handleDelete(id)}
      className="text-red-500 group bg-red-50 p-2 rounded-xl"
    >
      {idDelete == id ? (
        <ArrowPathIcon className="w-6 h-6 animate-spin" />
      ) : (
        <TrashIcon className="w-6 h-6 group-hover:scale-110 duration-300 transform transition-transform" />
      )}
    </button>
  );
}

export default DeleteCollege;
