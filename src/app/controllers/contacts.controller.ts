"use strict";

import { Request, Response } from "express";
import { SuccessResponse } from "../../utils/response";

export async function CreateContact(req: Request, res: Response) {
}
export async function GetContact(req: Request, res: Response) {
  const contact = {
    id: "1",
    name: "John Doe",
    address: "",
    phone: "00987654321",
    email: "email@email.com",
    groupId: "1",
  };
  SuccessResponse(res, contact);
  
}
export async function UpdateContact(req: Request, res: Response) {}
export async function DeleteContact(req: Request, res: Response) {}
