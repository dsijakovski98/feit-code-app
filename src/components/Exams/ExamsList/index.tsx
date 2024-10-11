import { ReactNode } from "react";

import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { EXAMS_PER_PAGE } from "@/constants/queries";
import { useLoadMore } from "@/hooks/useLoadMore";

type Props<T extends { id: string }> = {
  examsQuery: UseInfiniteQueryResult<InfiniteData<T[]>>;
  renderExam: (exam: T) => ReactNode;
};

const ExamsList = <T extends { id: string }>({ examsQuery, renderExam }: Props<T>) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = examsQuery;

  const { ref } = useLoadMore(fetchNextPage);

  if (!data) return null;

  return (
    <Swiper
      grabCursor={!isFetching}
      spaceBetween={20}
      slidesPerView="auto"
      centerInsufficientSlides={data.pages[0].length > EXAMS_PER_PAGE - 1}
      navigation={{ hideOnClick: true, enabled: !isFetching }}
      pagination={{ dynamicBullets: true }}
      modules={[A11y, Pagination, Navigation]}
      className="swiper-items !px-8 !pb-10 !pt-1 lg:!px-5 lg:!pt-2"
    >
      {data.pages.flatMap((page) =>
        page.map((exam) => (
          <SwiperSlide key={exam.id} className="!h-auto !w-fit min-w-[20ch]">
            {renderExam(exam)}
          </SwiperSlide>
        )),
      )}

      {hasNextPage && (
        <SwiperSlide>
          <div ref={ref} aria-hidden />
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default ExamsList;
