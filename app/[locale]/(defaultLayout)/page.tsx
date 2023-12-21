import React from "react";
import BlockOne from "@app/components/home-page/block-1";
import BlockTwo from "@app/components/home-page/block-2";
import Map from "@app/components/home-page/Map";
import {getTestimonials} from "@app/server-actions/testimonials";
import {ListContent} from "@framework/list/list.definition";
import {Testimonial} from "@components/dashboard/testimonials/model";
import TextModules from "@app/components/home-page/text.modules";
import TestimonialsMarquee from "@app/components/home-page/TestimonialsMarquee";
import TextBlock from "@app/components/home-page/text.block";

interface HomeProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home = async ({params, searchParams}: HomeProps) => {
  const testimonials: ListContent<Testimonial> = await getTestimonials();

  return (
    <>
      <BlockOne
        locale={params.locale}
        testimonial={testimonials ? testimonials.data[0] : ({} as any)}
      />
      <TextModules locale={params.locale}/>
      <TextBlock locale={params.locale}/>
      <BlockTwo locale={params.locale}/>
      <Map locale={params.locale}/>
      {/* <Textblock />*/}
      <TestimonialsMarquee locale={params.locale}/>
    </>
  );
};
export default Home;
