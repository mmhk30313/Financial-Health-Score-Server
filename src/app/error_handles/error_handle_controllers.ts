import {
  NextFunction, Request, Response
} from "express";

export const error4o4Controller = (req: Request, res: Response, next: NextFunction) => {
  let err: any = new Error("404 no route");
  err.status = 404
  next(err)
}

export const error401Controller = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
    res.status(401).json({
      status: false,
      message: error?.message || "User is unauthorized!!!"
    });
  }
  return res.status(401).json({
    status: false,
    message: "User is unauthorized!!!"
  });
}


export const error500Controller = (error: any, req: Request, res: Response, next: NextFunction) => {

  if (error.status) {
    console.log("====24====", error?.message);
    return res.status(error?.status).json({
      status: false,
      message: error?.message ?? 'server error'
    });
  }

  // console.log(error?.message);
  return res.json({ message: "server error" })
}