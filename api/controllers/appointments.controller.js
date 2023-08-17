import { DateTime } from "luxon";
import Appointment from "../schemas/appointment.schema";


// Create a new appointment
export const createAppointment = async (req, res) => {
    try {
        console.log("Raw date from request:", req.body.date);

        const durationInMinutes = req.body.duration || 20; // Default duration is 20 minutes
        const selectedDate = DateTime.fromISO(req.body.date, { zone: "Asia/Karachi" });
    
        console.log("Parsed date:", selectedDate.toISO());
    
        const startTime = selectedDate;
        const endTime = selectedDate.plus({ minutes: durationInMinutes });
    
        console.log("Start Time:", startTime.toJSDate());
        console.log("End Time:", endTime.toJSDate());
  
      const overlappingAppointments = await Appointment.find({
        doctorId: req.body.doctorId,
        date: {
          $gte: startTime.toJSDate(),
          $lt: endTime.toJSDate(),
        },
      });
  
      console.log("Overlapping Appointments:", overlappingAppointments);
  
      const adjacentAppointmentsBefore = await Appointment.find({
        doctorId: req.body.doctorId,
        date: {
          $lte: startTime.toJSDate(),
          $gt: selectedDate.minus({ minutes: durationInMinutes }).toJSDate(),
        },
      });
  
      console.log("Adjacent Appointments Before:", adjacentAppointmentsBefore);
  
      const adjacentAppointmentsAfter = await Appointment.find({
        doctorId: req.body.doctorId,
        date: {
          $gte: endTime.toJSDate(),
          $lt: selectedDate.plus({ minutes: durationInMinutes }).toJSDate(),
        },
      });
  
      console.log("Adjacent Appointments After:", adjacentAppointmentsAfter);
  
      if (overlappingAppointments.length > 0) {
        return res.status(400).json({ error: "Slot is already booked." });
      }
  
      if (adjacentAppointmentsBefore.length === 0 && adjacentAppointmentsAfter.length === 0) {
        const newAppointment = await Appointment.create({
            ...req.body,
            startTime: startTime.toJSDate(),
            endTime: endTime.toJSDate(),
          });
       
        console.log("New Appointment:", newAppointment);
  
        return res.status(201).json(newAppointment);
      } else {
        return res.status(400).json({ error: "Cannot book overlapping or adjacent slot." });
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      return res.status(500).json({ error: "Could not create the appointment." });
    }
  };
  
  
  

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve appointments." });
  }
};

// Get a single appointment by ID
export const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve the appointment." });
  }
};

// Update an appointment by ID
export const updateAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }
    return res.status(200).json(updatedAppointment);
  } catch (error) {
    return res.status(500).json({ error: "Could not update the appointment." });
  }
};

// Delete an appointment by ID
export const deleteAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }
    return res.status(200).json({ message: "Appointment deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete the appointment." });
  }
};

