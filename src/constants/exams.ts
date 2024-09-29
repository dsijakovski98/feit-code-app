import sh from "@/images/programming-languages/bash.svg&img";
import c from "@/images/programming-languages/c.svg&img";
import cpp from "@/images/programming-languages/cpp.svg";
import go from "@/images/programming-languages/go.svg&img";
import js from "@/images/programming-languages/javascript.svg&img";
import php from "@/images/programming-languages/php.svg&img";
import py from "@/images/programming-languages/python.svg";
import rust from "@/images/programming-languages/rust.svg&img";
import ts from "@/images/programming-languages/typescript.svg";

import { PROGRAMMING_LANGUAGE } from "@/constants/enums";

export const PROGRAMMING_LANGUAGES: Array<{ name: string; img: typeof js }> = [
  { name: PROGRAMMING_LANGUAGE.javascript, img: js },
  { name: PROGRAMMING_LANGUAGE.c, img: c },
  { name: PROGRAMMING_LANGUAGE.bash, img: sh },
  { name: PROGRAMMING_LANGUAGE.typescript, img: ts },
  { name: PROGRAMMING_LANGUAGE.cpp, img: cpp },
  { name: PROGRAMMING_LANGUAGE.go, img: go },
  { name: PROGRAMMING_LANGUAGE.python, img: py },
  { name: PROGRAMMING_LANGUAGE.rust, img: rust },
  { name: PROGRAMMING_LANGUAGE.php, img: php },
];
