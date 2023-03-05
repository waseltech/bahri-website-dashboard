"use client";
import InputText from "@/components/InputText";
import InputTextarea from "@/components/InputTextarea";
import { useAppDispatch } from "@/store";
import { createNews, updateNews, useNews } from "@/store/news";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const newsSchema = Yup.object().shape({
  titleAr: Yup.string().required("Arabic title Required"),
  titleEn: Yup.string().required("English title Required"),
  descriptionAr: Yup.string().required("Arabic Description  Required"),
  descriptionEn: Yup.string().required("English Descripption Required"),
});

function NewsForm({ setClose }: { setClose(close: boolean): void }) {
  const { loading, currentNews, currentNewsId } = useNews();

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any) => {
    if (currentNewsId && currentNews) {
      const updateres = await dispatch(
        updateNews({
          id: currentNewsId,
          news: e,
        })
      );

      if (updateres.type === "news/updateNews/fulfilled") {
        setClose(false);
      }
    } else {
      const res = await dispatch(createNews(e));

      if (res.type === "news/createNews/fulfilled") {
        setClose(false);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        titleAr: currentNews?.titleAr || "",
        titleEn: currentNews?.titleEn || "",
        descriptionAr: currentNews?.descriptionAr || "",
        descriptionEn: currentNews?.descriptionEn || "",
      }}
      onSubmit={onSubmit}
      validationSchema={newsSchema}
    >
      {
        <Form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <InputText name="titleAr" placeholder="Arabic Title" />
            <InputTextarea
              name="descriptionAr"
              rows={10}
              placeholder="Arabic Content"
            />
          </div>

          <div>
            <InputText name="titleEn" placeholder="English Title" />

            <InputTextarea
              name="descriptionEn"
              rows={10}
              placeholder="English Content"
            />
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

export default NewsForm;
