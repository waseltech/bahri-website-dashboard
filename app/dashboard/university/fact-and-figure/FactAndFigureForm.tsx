"use client";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import {
  createFactAndFigure,
  updateFactAndFigure,
  useFactAndFigure,
} from "@/store/university";
import { ArrowPathIcon, BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const newsSchema = Yup.object().shape({
  count: Yup.number().required("English title Required"),
  descriptionAr: Yup.string().required("Arabic Description  Required"),
  descriptionEn: Yup.string().required("English Descripption Required"),
});

function FactAndFigureForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentFactAndFigure, currentFactAndFigureId } =
    useFactAndFigure();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentFactAndFigureId && currentFactAndFigure) {
      const updateres = await dispatch(
        updateFactAndFigure({
          id: currentFactAndFigureId,
          change: e,
        })
      );

      if (updateres.type === "factAndFigure/updateFactAndFigure/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createFactAndFigure(e));

      if (res.type === "factAndFigure/createFactAndFigure/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        count: currentFactAndFigure?.count || 0,
        descriptionAr: currentFactAndFigure?.descriptionAr || "",
        descriptionEn: currentFactAndFigure?.descriptionEn || "",
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
    >
      {
        <Form className="flex flex-col gap-4">
          <InputText type="number" name="count" placeholder="Count" />
          <InputTextarea
            name="descriptionAr"
            rows={10}
            placeholder="Arabic Content"
          />

          <InputTextarea
            name="descriptionEn"
            rows={10}
            placeholder="English Content"
          />

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

export default FactAndFigureForm;
