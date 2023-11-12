import { IUser } from "./user.interface";
import User from "./user.model";
import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Task 2: Implement a MongoDB query to find all users in the "Users" collection with a
// specific genre, such as "Fantasy"

// solution - Task 2:
export const findUsersByGenre = async (payload: string): Promise<IUser[]> => {

  const users = await User.find({ genre: payload });

  return users;
};

// Task 3: Implement a MongoDB query to find users in the "Users" collection with
// a specific genre “Sci - Fi” and published by “Roli Users”.

// payload:

// body = {
//   genre: "Sci - Fi",
//   publisher: "Roli Users",
// }

export const signUpUser = async (payload: any): Promise<any> => {

  // const now = new Timestamp(new Date());
  // console.log({now});
  try {
    const { password, confirm_password, email } = payload;
    if (password !== confirm_password) {
      return {
        success: false,
        status: 406,
        message: password.length < 8 ? "Password length should be greater than 8 !!!" : "Your password and confirm password are not matched"
      }
    } else {
      try {
        const already_exist_user = await User.findOne({ email });
        if (already_exist_user) {
          return {
            success: false,
            status: 200,
            message: "This email is already exist for another user",
          };
        } else {
          const user_body = payload;

          delete user_body.confirm_password;
          const newUser = new User(user_body);

          const res_signup = await newUser.save();
          const user: any = res_signup;
          console.log({ user });

          if (user) {
            const tokenObject = { email: user?.email, name: user?.name };
            const accessToken = jwt.sign(tokenObject, (accessTokenSecret || "fhs_secret_key"));
            const dataObj = {
              token: accessToken,
            };
            await User.updateOne({ email }, dataObj);
            return {
              status: 200,
              success: true,
              message: "The user is successfully registered!!!",
              data: { user: { email: user?.email, name: user?.name }, accessToken },
            };
          }
          return {
            status: false,
            success: 500,
            message: "Server error"
          };
        }

      } catch (error: any) {
        return {
          status: 500,
          success: false,
          message: error?.message || "Something wrong"
        }
      }
    }
  } catch (error: any) {
    console.log({ error });
    return {
      status: error.status || 500,
      success: false,
      message: error.message
    }
  }
};

// // Task 4: Create an instance method within the "User" model to retrieve users from the "Users" collection that have a rating equal to or higher than 4.
// // These users will be categorized as featured users.
// // Additionally, introduce a new field named "featured" to the featured user objects.
// // The value of this field should be "Popular" if the user's rating is greater than or equal to 4. For users with a rating exceeding 4.5, the value should be set to "BestSeller".

// // Solution 4:
// export const findFeaturedUsers = async (): Promise<IUser[]> => {

//   const users = await User.getFeaturedUsers();

//   return users;
// };

// // Task 5: In the existing user data, some users have their prices stored as strings instead of integers.
// // To ensure consistent data representation, you are required to update the prices of all users from string format to integer format using a MongoDB update query.
// // However, to limit the scope of the update and ensure data accuracy, the prices should be updated only for users published after 2020.

// // Solution 5:
// export const updateSpecificUserPricesType = async (): Promise<any> => {

//   const updated_users_res = await User.updateUserPricesType();

//   return updated_users_res;
// };