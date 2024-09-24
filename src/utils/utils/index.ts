"use strict";

import PWGenerator from "generate-password";

export function RandomPassword(): string {
  const password = PWGenerator.generate({
    length: 10,
    numbers: true,
  });
  return password;
}

export function isEmpty(objectToCheck: any) {
  if (!objectToCheck) {
    return true;
  }
  if (typeof objectToCheck === "object" && !Array.isArray(objectToCheck)) {
    return Object.keys(objectToCheck).length === 0;
  }
  return false;
}
