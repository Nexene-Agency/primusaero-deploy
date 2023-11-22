import React from "react";
import BlockOne from "@app/components/home-page/block-1";
import BlockTwo from "@app/components/home-page/block-2";
import BlockThree from "@app/components/home-page/block-3";
import {DatabaseEntry} from "@framework/firebase.utils";
import {TestimonialReference} from "@components/dashboard/testimonials/model";
import {getTestimonials} from "@app/server-actions/testimonials";

interface HomeProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home = async ({params, searchParams}: HomeProps) => {
  const testimonials: DatabaseEntry<TestimonialReference>[] | undefined = await getTestimonials();

  return (
    <>
      <BlockOne locale={params.locale} testimonial={testimonials ? testimonials[0] : {} as any}/>
      <BlockTwo locale={params.locale}/>
      <BlockThree locale={params.locale}/>
    </>
  );
};
export default Home;
