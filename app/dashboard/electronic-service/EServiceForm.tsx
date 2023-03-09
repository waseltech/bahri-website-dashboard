"use client";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import { useEService } from "@/store/electronic-service";
import {
  createVisionMission,
  updateVisionMission,
  useVisionMission,
} from "@/store/university";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const iconList = [
  "ri-mail-check-line",
  "ri-computer-line",
  "ri-google-line",
  "ri-search-2-line",
  "ri-file-2-line",
  "ri-sound-module-line",
  "ri-user-2-line",
  "ri-pencil-line",
];

const newsSchema = Yup.object().shape({
  titleAr: Yup.string().required("Arabic title Required"),
  titleEn: Yup.string().required("English title Required"),
  icon: Yup.string().required("icon Required"),
});

function EserviceForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentEService, currentEServiceId } = useEService();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentEServiceId && currentEService) {
      const updateres = await dispatch(
        updateVisionMission({
          id: currentEServiceId,
          news: e,
        })
      );

      if (updateres.type === "eService/updateEService/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createVisionMission(e));

      if (res.type === "eService/createEService/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        titleAr: currentEService?.titleAr || "",
        titleEn: currentEService?.titleEn || "",
        icon: currentEService?.icon || "",
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
    >
      {
        <Form className="flex flex-col gap-4">
          <InputText name="titleAr" placeholder="Arabic Title" />
          <InputText name="titleEn" placeholder="English Title" />

          <div>
            <div className="flex flex-wrap gap-4">
              {iconList.map((icon) => (
                <i className={`${icon} ri-3x bg-gray-100 p-2 rounded-full`}></i>
              ))}
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn--primary gap-1">
              {loading && <ArrowPathIcon className="w-5 animate-spin" />}
              <BookmarkSquareIcon className="w-5" />
              Save
            </button>
          </div>
        </Form>
      }
    </Formik>
  );
}

export default EserviceForm;
