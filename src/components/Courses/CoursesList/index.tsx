import { ElementRef, ReactNode, useCallback, useLayoutEffect, useMemo, useRef } from "react";

import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { InferSelectModel } from "drizzle-orm";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { courses } from "@/db/schema";

import { COURSES_PER_PAGE } from "@/constants/queries";
import { CourseSearchContext } from "@/context/CourseSearch.Context";
import { useCtx } from "@/hooks/useCtx";

import "./styles.css";

type Props<T extends { id: string }> = {
  coursesQuery: UseInfiniteQueryResult<InfiniteData<T[]>>;
  renderCourse: (course: T) => ReactNode;
};

const CoursesList = <T extends { id: string }>({ coursesQuery, renderCourse }: Props<T>) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = coursesQuery;

  const { search } = useCtx(CourseSearchContext);

  const filteredPages = useMemo(
    () =>
      data?.pages.map((page) => {
        return page.filter((courseItem) => {
          let courseName = "";

          if ("name" in courseItem) {
            courseName = courseItem.name as string;
          } else if ("course" in courseItem) {
            const course = courseItem.course as InferSelectModel<typeof courses>;
            courseName = course.name;
          } else {
            throw new Error(`Unsupported course type ${courseItem}`);
          }

          return courseName.toLowerCase().startsWith(search.toLowerCase());
        });
      }) ?? [],
    [data?.pages, search],
  );

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
      spaceBetween={20}
      slidesPerView="auto"
      centerInsufficientSlides={data.pages[0].length > COURSES_PER_PAGE - 1}
      navigation={{ hideOnClick: true, enabled: !isFetching }}
      pagination={{ dynamicBullets: true }}
      modules={[A11y, Pagination, Navigation]}
      className="swiper-courses !px-8 !pb-10 !pt-1 lg:!px-5 lg:!pt-2"
    >
      {filteredPages.flatMap((page) =>
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
