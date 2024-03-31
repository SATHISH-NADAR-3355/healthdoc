const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-users", authMiddleware, async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send({
        message: "Users fetched successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).send({ message: "Error in featching user", success: true });
    }
  });

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res
      .status(200)
      .send({
        message: "Doctors fetched successfully",
        success: true,
        data: doctors,
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in featching doctors", success: true });
  }
});

router.post("/change-doctor-request-status", authMiddleware, async (req, res) => {
  try {
    const  {doctorId, status, userId} = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId,{status}); //finding doctor  by id and updating the field 'status' 
    const user = await User.findOne({_id: doctor.userId});
    const unseenNotifications = user.unseenNotifications; //fetch unseen notification

      unseenNotifications.push({ //send to 'user' when admin approves / rejects application
        type: "new-doctor-request-approval/rejection",
        message: `Dear,${doctor.firstName} ${doctor.lastName} your application to join Healthdoc has been ${status}.`,
        onClickPath: "/notifications",
      });

      user.isDoctor = status === "approved" ? true : false;
      await user.save();

      res
        .status(200)
        .send({
        message:"Doctor status updated successfully",
        success:true,
        data:doctor,
      });

  } catch (error) {
    res
      .status(500)
      .send({ message: "Error in changing doctor status", success: true });
  }
});

module.exports = router; 
