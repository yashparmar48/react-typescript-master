import { useState } from "react";
import Header from "~/components/Header";
import ImageSlider from "~/components/ImageSlider";
import Pagination from "~/components/Pagination";

export function Welcome() {

  const country = 'india'
  return (
    <>
      <ImageSlider />
      <Pagination />
    </>
  );
}


