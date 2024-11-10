import { Router } from "express";
import {
  createWorkScope,
  deleteWorkScope,
  fetchWorkScopes,
  updateWorkScope,
} from "../Controllers/workscope";

const router = Router();

router.route("/").get(fetchWorkScopes).post(createWorkScope);
router.route("/:id").patch(updateWorkScope).delete(deleteWorkScope);

export { router };
