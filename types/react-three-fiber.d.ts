// types/react-three-fiber.d.ts
/// <reference types="@react-three/fiber" />

import {ThreeElements} from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
