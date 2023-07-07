import express from "express";
import {
  clientController,
  registerController,
  updateClientController,
  topController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

//router object

const router = express.Router();

//routing
//REGISTER  || METHOD POST

router.post("/register", registerController);
router.post("/client", clientController);
router.put("/update-client/:id", requireSignIn, updateClientController);
router.get("/view-client", requireSignIn, topController);
export default router;
