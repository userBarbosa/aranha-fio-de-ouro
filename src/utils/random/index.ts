"use strict";

import PWGenerator from "generate-password";

export function RandomPassword() : string {
  const password = PWGenerator.generate({
    length: 10,
    numbers: true,
  });
  return password;
}
