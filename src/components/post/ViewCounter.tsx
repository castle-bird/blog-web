"use client";

import {useEffect, useRef} from "react";
import {increasePostView} from "@/lib/posts";

type ViewCounterProps = {
  postId: number;
};

const ViewCounter = ({postId}: ViewCounterProps) => {
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;
    increasePostView(postId).catch(() => {});
  }, [postId]);

  return null;
};

export default ViewCounter;
