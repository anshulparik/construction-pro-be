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
    const foundLog = await Logs?.findById(id);

    if (foundLog?.isComplete) {
      res.status(400).json({
        msg: `Log is already complete!`,
      });
      return;
    }

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

const displayLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = await Logs.find().populate("workScope").exec();
    const filteredLogs = logs.filter((log) => {
      const workScope = log.workScope;
      const durationDays = workScope.duration;
      const [hours, minutes] = workScope.displayTime.split(":").map(Number);
      const varianceHours = workScope.variance;

      const now = new Date();
      const logCreatedTime = new Date(log.createdAt);
      let displayStartTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes,
        0
      );

      // if displaytime is passed for today
      if (logCreatedTime > displayStartTime) {
        displayStartTime.setDate(displayStartTime.getDate() + 1);
      }

      // adding offset for IST
      const displayStartTimeIST = new Date(
        displayStartTime.getTime() -
          displayStartTime.getTimezoneOffset() * 60 * 1000
      );

      const displayEndTime = new Date(displayStartTimeIST);
      displayEndTime.setDate(displayEndTime.getDate() + durationDays);
      displayEndTime.setHours(displayEndTime.getHours() + varianceHours);
      
      return now >= displayStartTimeIST && now <= displayEndTime;
    });

    res.status(200).json(filteredLogs);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  completeLog,
  fetchLogs,
  deleteLog,
  displayLogs,
  fetchLogsByLocationId,
  fetchLogsByWorkScopeId,
};
