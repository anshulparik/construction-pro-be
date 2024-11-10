import { Router } from "express";
import {
  createLocation,
  deleteLocation,
  fetchLocations,
  updateLocation,
  updateLocationStatus,
  addWorkScopeToLocation,
} from "../Controllers/location";

const router = Router();

router.route("/").get(fetchLocations).post(createLocation);
router.route("/:id").patch(updateLocation).delete(deleteLocation);
router.route("/status/:id").patch(updateLocationStatus);
router
  .route("/:locationId/workscope/:workScopeId")
  .post(addWorkScopeToLocation);

export { router };
