import { Express } from "express";

declare module "express" {
  export interface Request {
    route?: {
      path: string;
    };
  }
}

export interface TodoParams {
  id: string;
  title: string;
  description: string;
  is_completed: string;
}
