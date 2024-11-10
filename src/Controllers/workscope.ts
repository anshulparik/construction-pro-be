import { Request, Response } from "express";
import { WorkScope } from "../Models/WorkScope";

const fetchWorkScopes = async (req: Request, res: Response): Promise<void> => {
  try {
    const workScopes = await WorkScope.find();
    res.status(200).json({ workScopes });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createWorkScope = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, duration, displayTime, variance } = req.body;
    const createdWorkScope = new WorkScope({
      name,
      duration,
      displayTime,
      variance,
    });
    await createdWorkScope.save();
    res.status(201).json({
      workScope: createdWorkScope,
      msg: "WorkScope created successfully!",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateWorkScope = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id;
    const { name, duration, displayTime, variance } = req?.body;
    if (!name && !duration && !displayTime && !variance) {
      res.status(400).json({ msg: "Please provide valid fields to update!" });
      return;
    }
    const workScope = await WorkScope?.findByIdAndUpdate(
      id,
      { name, duration, displayTime, variance },
      {
        new: true,
      }
    );
    res.status(200).json({ workScope });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteWorkScope = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id;
    await WorkScope.findByIdAndDelete(id);
    res.status(200).json({ msg: "WorkScope deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { createWorkScope, updateWorkScope, fetchWorkScopes, deleteWorkScope };
