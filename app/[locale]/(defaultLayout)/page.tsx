import React from "react";
import BlockOne from "@app/components/home-page/block-1";
import BlockTwo from "@app/components/home-page/block-2";
import BlockThree from "@app/components/home-page/block-3";
import {getTestimonials} from "@app/server-actions/testimonials";
import {ListContent} from "@framework/list/list.definition";
import {Testimonial} from "@components/dashboard/testimonials/model";

interface HomeProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home = async ({params, searchParams}: HomeProps) => {
  const testimonials: ListContent<Testimonial> = await getTestimonials();

  return (
    <>
      <BlockOne locale={params.locale} testimonial={testimonials ? testimonials.data[0] : {} as any}/>
      <BlockTwo locale={params.locale}/>
      <BlockThree locale={params.locale}/>
    </>
  );
};
export default Home;
