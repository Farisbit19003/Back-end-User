// controllers/doctor.controller.js

import Doctor from "../schemas/doctor.schema";


// Controller for creating a new doctor
export const createDoctor = async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    return res.status(201).json(newDoctor);
  } catch (error) {
    return res.status(500).json({ error: "Could not create the doctor." });
  }
};

// Controller for retrieving all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve doctors." });
  }
};

// Controller for retrieving a single doctor by ID
export const getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }
    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve the doctor." });
  }
};
