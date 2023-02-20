"use client";
import InputText from "@/components/InputText";
import { useAppDispatch } from "@/store";
import { createCollege, useCollege } from "@/store/college";
import { ArrowPathIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const collegeSchema = Yup.object().shape({
  nameAr: Yup.string().required("Required"),
  nameEn: Yup.string().required("Required"),
  code: Yup.string().min(2, "Too Short!").required("Required"),
});

function CollegeForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading } = useCollege();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    const res = await dispatch(createCollege(e));

    if (res.type === "college/createCollege/fulfilled") {
      setClose(false);
    }
  };
  return (
    <Formik
      initialValues={{ nameAr: "", nameEn: "", code: "", location: "" }}
      onSubmit={onSubmit}
      validationSchema={collegeSchema}
    >
      {
        <Form className="flex flex-col items-center bg-white p-8 rounded-xl">
          <h1 className="text-2xl font-bold text-gray-700 my-2">
            Add New College
          </h1>
          <InputText name="nameAr" type="text" placeholder="Arabic Name" />
          <InputText name="nameEn" type="text" placeholder="English Name" />
          <InputText name="code" type="text" placeholder="Code" />
          <InputText name="location" type="text" placeholder="Location" />

          <button type="submit" className="btn btn--primary">
            {loading && <ArrowPathIcon className="w-5 animate-spin" />}
            <KeyIcon className="w-5" />
            Register
          </button>
        </Form>
      }
    </Formik>
  );
}

export default CollegeForm;
