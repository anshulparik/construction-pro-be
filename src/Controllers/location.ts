import { Request, Response } from "express";
import { Location } from "../Models/Location";
import { WorkScope } from "../Models/WorkScope";
import { Logs } from "../Models/Logs";

const fetchLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await Location.find();
    res.status(200).json({ locations });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const createdLocation = new Location({
      name,
    });
    await createdLocation.save();
    res.status(201).json({
      location: createdLocation,
      msg: "Location created successfully!",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id;
    const { name } = req?.body;
    if (!name) {
      res.status(400).json({ msg: "Please provide valid fields to update!" });
      return;
    }
    const location = await Location?.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json({ location });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateLocationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req?.params?.id;
    const foundLocation = await Location?.findById(id);
    if (foundLocation) {
      if (!foundLocation?.workScope) {
        res.status(400).json({
          msg: `No workscope added to the location!`,
        });
        return;
      }

      if (foundLocation?.status === "complete") {
        res.status(400).json({
          msg: `Status for location ${foundLocation?.name} is already completed!`,
        });
        return;
      }
    }
    const location = await Location?.findByIdAndUpdate(
      id,
      { status: "complete" },
      { new: true }
    );

    const logs = new Logs({
      message: `Status completed for location ${foundLocation?.name}!`,
      location: foundLocation._id,
      workScope: foundLocation.workScope,
    });
    await logs.save();
    res.status(200).json({ location });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addWorkScopeToLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const locationId = req?.params?.locationId;
    const workScopeId = req?.params?.workScopeId;
    const workScope = await WorkScope?.findById(workScopeId);
    if (!workScope) {
      res.status(400).json({
        msg: `Workscope doesn't exist!`,
      });
      return;
    }

    const location = await Location?.findByIdAndUpdate(
      locationId,
      { workScope: workScopeId },
      { new: true }
    );
    res.status(200).json({ location });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id;
    const logs = await Logs.find({ location: id });
    if (logs.length > 0) {
      res.status(400).json({
        msg: `Location can't be deleted if logs are present!`,
      });
      return;
    }
    await Location.findByIdAndDelete(id);
    res.status(200).json({ msg: "Location deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  updateLocationStatus,
  addWorkScopeToLocation,
};
