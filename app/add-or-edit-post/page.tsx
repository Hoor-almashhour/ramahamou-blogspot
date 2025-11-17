import React, { Suspense } from "react";
import AddOrEditPostForm from "./AddOrEditPostForm";

export default function Page() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <AddOrEditPostForm />
    </Suspense>
);
}