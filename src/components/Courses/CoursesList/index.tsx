import { ElementRef, ReactNode, useCallback, useLayoutEffect, useRef } from "react";

import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./styles.css";

type Props<T extends { id: string }> = {
  coursesQuery: UseInfiniteQueryResult<InfiniteData<T[]>>;
  renderCourse: (course: T) => ReactNode;
};

const CoursesList = <T extends { id: string }>({ coursesQuery, renderCourse }: Props<T>) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = coursesQuery;

  const loadMoreRef = useRef<ElementRef<"div">>(null);

  const loadMoreCallback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const [loadMoreEntry] = entries;

      if (loadMoreEntry.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage],
  );

  useLayoutEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(loadMoreCallback);
    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreCallback]);

  if (!data) return null;

  return (
    <Swiper
      grabCursor={!isFetching}
      spaceBetween={30}
      slidesPerView="auto"
      centerInsufficientSlides
      navigation={{ hideOnClick: true, enabled: !isFetching }}
      pagination={{ dynamicBullets: true, clickable: true }}
      modules={[A11y, Pagination, Navigation]}
      className="swiper-courses !px-8 !pb-10 !pt-1 lg:!px-5 lg:!pt-2"
    >
      {data.pages.flatMap((page) =>
        page.map((item) => (
          <SwiperSlide key={item.id} className="!h-auto !w-fit min-w-[30ch]">
            {renderCourse(item)}
          </SwiperSlide>
        )),
      )}

      {hasNextPage && (
        <SwiperSlide hidden>
          <div ref={loadMoreRef} aria-hidden />
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default CoursesList;
