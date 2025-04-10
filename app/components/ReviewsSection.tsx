"use client";
import { useEffect, useRef, useState } from "react";
import { useGetEntity } from "@/lib/queries";
import React from "react";
import Comment from "./Comment";
import { SkeletonCard } from "./SkeletonCard";

const ReviewsSection = ({ id }: { id: string }) => {
  const [inView, setInView] = useState(false); // State to track if in view
  const sectionRef = useRef<HTMLDivElement | null>(null); // Reference to the component

  // Intersection observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once in view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const { data, isLoading } = useGetEntity(
    "getReviews",
    `reviews-${id}`,
    id,
    { enabled: inView } // Only fetch data when the component is in view
  );
  console.log(data)
  return (
    <div ref={sectionRef}>
      {inView ? (
        isLoading ? (
          <SkeletonCard />
        ) : (
          data?.reviews?.map((comment: any) => (
            <Comment date={comment.created_at} id={id} {...comment} key={comment.date} />
          ))
        )
      ) : (
        <SkeletonCard /> // Optional: Show a skeleton until it comes into view
      )}
    </div>
  );
};

export default ReviewsSection;
