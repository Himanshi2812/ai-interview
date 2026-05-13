"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border/80 bg-card p-2 shadow-sm">
      <MDEditor value={content} preview="preview" height={700} />
    </div>
  );
};

export default CoverLetterPreview;
