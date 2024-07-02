"use client";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { movies } from "./movies";
import { bebas } from "./fonts";
import { TiArrowShuffle } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import { getRandomMovieId } from "./shuffle";
import { Movie } from "./interfaces/movieDataInterfaces";
import { useInView } from "react-intersection-observer";
import { Cartelera } from "./components/cartelera";
import { OptionButtonGroup } from "./components/optionButtonGroup";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/movies/list");
  });
}
