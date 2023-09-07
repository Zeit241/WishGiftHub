import { User } from "@prisma/client"

export type IsEqual<Type1, Type2> = (Type1 | Type2) extends (Type1 & Type2) ? true : never;
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
