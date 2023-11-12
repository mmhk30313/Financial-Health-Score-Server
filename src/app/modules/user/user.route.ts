import express from "express";
import { createUser, getSpecificUsers } from "./user.controller";

const router = express.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get specific users
 *     description: Retrieve a list of specific users
 *     responses:
 *       200:
 *         description: OK
 */
// router.get("/users", getSpecificUsers);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Get specific users by genre and publisher
 *     description: Retrieve a list of specific users based on genre and publisher
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/signup", createUser);

/**
 * @swagger
 * /user/:id:
 *   get:
 *     summary: Get featured users
 *     description: Retrieve a list of featured users
 *     responses:
 *       200:
 *         description: OK
 */
// router.get("/:id", getFeaturedUsers);

/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Update user
 *     description: Update user based on IUSER type according to id
 *     responses:
 *       200:
 *         description: OK
 */
// router.patch("/user", updateUserPricesType);


export default router;
