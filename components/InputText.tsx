"use client";
import React from "react";
import { useField } from "formik";

function InputText({ label, ...props }: any) {
  const [field, meta] = useField(props);

  const { error, touched } = meta;
  return (
    <div>
      <input
        className="mt-1
        block
        w-full
        rounded-md
        bg-gray-100
        border-transparent
        focus:border-gray-500 focus:bg-white focus:ring-0"
        type="text"
        {...field}
        {...props}
        label={label}
        variant="standard"
        size="small"
        color="primary"
      />
      <div className="h-4">
        {error && touched ? (
          <span className="text-red-600 transition transform  motion-reduce:transition-none ">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default InputText;
