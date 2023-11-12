import { NextFunction, Request, Response } from "express";
import { findUsersByGenre, signUpUser } from "./user.service";

// url: /api/v1/user
export const getSpecificUsers = async (req: Request, res: Response, next: NextFunction) => {
  // console color coding by red & green
  console.log("\x1b[31m", "Req Method: ", "\x1b[32m", req.method);
  console.log("\x1b[31m", "Req Url: ", "\x1b[32m", req.url);
  const { genre } = req.query;

  const users = await findUsersByGenre(genre as string);

  res.status(200).json({
    status: "success",
    data: users,
  });
};


// url: /api/v1/user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // console color coding by red & green
  console.log("\x1b[31m", "Req Method: ", "\x1b[32m", req.method);
  console.log("\x1b[31m", "Req Url: ", "\x1b[32m", req.url);
  const payload = req.body;

  const user_res: any = await signUpUser(payload);

  res.status(user_res?.status).json(user_res);
};

// // Task 4: Create an instance method within the "user" model to retrieve users from the "Users" collection that have a rating equal to or higher than 4.
// // These users will be categorized as featured users.
// // Additionally, introduce a new field named "featured" to the featured user objects.
// // The value of this field should be "Popular" if the user's rating is greater than or equal to 4. For users with a rating exceeding 4.5, the value should be set to "BestSeller".

// // Solution 4:

// export const getFeaturedUsers = async (req: Request, res: Response, next: NextFunction) => {
//   // console color coding by red & green
//   console.log("\x1b[31m", "Req Method: ", "\x1b[32m", req.method);
//   console.log("\x1b[31m", "Req Url: ", "\x1b[32m", req.url);

//   const users = await findFeaturedUsers();

//   res.status(200).json({
//     status: "success",
//     data: users,
//   });
// };

// // Task 5: In the existing user data, some users have their prices stored as strings instead of integers.
// // To ensure consistent data representation, you are required to update the prices of all users from string format to integer format using a MongoDB update query.
// // However, to limit the scope of the update and ensure data accuracy, the prices should be updated only for users published after 2020.

// // Solution 5:

// export const updateUserPricesType = async (req: Request, res: Response, next: NextFunction) => {
//   // console color coding by red & green
//   console.log("\x1b[31m", "Req Method: ", "\x1b[32m", req.method);
//   console.log("\x1b[31m", "Req Url: ", "\x1b[32m", req.url);

//   const updated_res = await updateSpecificUserPricesType();

//   if (updated_res.modifiedCount === 0) {
//     return res.status(200).json({ status: "success", data: { message: "No user prices updated" } });
//   } else if (updated_res.modifiedCount) {
//     return res.status(200).json({ status: "success", data: { message: `${updated_res.modifiedCount} user prices updated successfully` } });
//   } else {
//     return res.status(200).json({ status: "success", data: { message: "Something went wrong" } });
//   }
// }
