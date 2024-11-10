import { Request, Response } from "express";
import { Logs } from "../Models/Logs";

const fetchLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = await Logs.find();
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const fetchLogsByLocationId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req?.params?.id;
    const logs = await Logs.find({ location: id });
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const fetchLogsByWorkScopeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req?.params?.id;
    const logs = await Logs.find({ workscope: id });
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const completeLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id;
    const log = await Logs?.findByIdAndUpdate(
      id,
      { isComplete: true },
      {
        new: true,
      }
    );
    res.status(200).json({ log });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req?.params?.id;
    await Logs.findByIdAndDelete(id);
    res.status(200).json({ msg: "Log deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  completeLog,
  fetchLogs,
  deleteLog,
  fetchLogsByLocationId,
  fetchLogsByWorkScopeId,
};
