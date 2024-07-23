// import Applicant from "../models/applicant.js";
import Job from "../models/job.js";
import User from "../models/user.js";
import { Op } from "sequelize";

// CONTROLLER APPLYCANT
// VARIABLE GET DATA LOWONGAN POSTING SECARA MENYELURUH
export const getJobs = async (req, res) => {
  try {
    let response;
    if (req.role === "applicant") {
      response = await Job.findAll({
        attributes: [
          "uuid",
          "title",
          "description",
          "requirements",
          "contactInfo",
        ],
      });
    } else {
      response = await Job.findAll({
        attributes: [
          "uuid",
          "title",
          "description",
          "requirements",
          "contactInfo",
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// VARIABLE GET DATA LOWONGAN POSTING DENGAN TYPE ID MENGGUNAKAN UUID MENAMBAHKAN DI ENDPOIN
export const getJobsById = async (req, res) => {
  try {
    const job = await Job.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!job) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "applicant") {
      response = await Job.findOne({
        where: {
          id: job.id,
        },
        attributes: [
          "uuid",
          "title",
          "description",
          "requirements",
          "contactInfo",
        ],
      });
    } else {
      response = await Job.findOne({
        attributes: [
          "uuid",
          "title",
          "description",
          "requirements",
          "contactInfo",
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
