import { Router } from "express";
import {
  deleteLog,
  fetchLogs,
  fetchLogsByLocationId,
  fetchLogsByWorkScopeId,
  completeLog,
  displayLogs,
} from "../Controllers/logs";

const router = Router();

router.route("/").get(fetchLogs)
router.route("/display").get(displayLogs);
router.route("/:id").get(fetchLogsByLocationId).patch(completeLog).delete(deleteLog);
router.route("/workscope/:id").get(fetchLogsByWorkScopeId);

export { router };
