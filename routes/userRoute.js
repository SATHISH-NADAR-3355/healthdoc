const express = require('express'); //to deploy rest API
const router = express.Router();
const User = require('../models/userModel.js');
const Doctor = require('../models/doctorModel');
const bcrypt = require("bcryptjs") //used to hash the password (encrypt)
const jwt = require('jsonwebtoken'); //generates unique token in the aapplication tab in the inspector (authentication)
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ $or: [{ email: req.body.email }, { name: req.body.name }] });
        if (userExists) {
            if (userExists.email === req.body.email) {
                return res.status(405).send({ message: "User already exists", success: false });
            } else if (userExists.name === req.body.name) {
                return res.status(409).send({ message: "Username is taken, please choose a different username", success: false });
            }
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({ message: "User registration successful", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while registering user", success: false });
    }
}); //MOD

//login ||POST
router.post('/login', async (req, res) => { //endpoint and callback fn (req, res)
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ messaage: "Password is incorrect", success: false });
        }
        else {
            console.log('toekn generated')
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); //dotenv to store credentials and imp details
            res
                .status(200)
                .send({ messaging: "login successful", success: true, data: token })
        }
    }
    catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ messaage: "Error login in error", success: false, error });
    }
}); //OG

//user authorization || POST
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;

        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false });
        } else {
            res.status(200).send({
                success: true, 
                data: user
                // data: {...user._doc, password:''},

                // success: true, data: {
                //     name: user.name,
                //     email: user.email,
                //     seenNotifications: user.seenNotifications,
                //     unseenNotifications: user.unseenNotifications,
                //     isAdmin: user.isAdmin,
                //     isDoctor: user.isDoctor,

                // }
            });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error getting user info", success: false, error });
    }
}); //auth

router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
    try {
      const newdoctor = new Doctor({ ...req.body, status: "pending" }); //to merge the properties of req_body and status we use '...' (it is called as spread syntax)
      await newdoctor.save();
      const adminUser = await User.findOne({ isAdmin: true }); //the doc is still a user untill approved, hence used 'User'
  
      const unseenNotifications = adminUser.unseenNotifications;
      unseenNotifications.push({ //send to admin when 'user' enrolls for doctor
        type: "new-doctor-request",
        message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
        data: {
          doctorId: newdoctor._id,
          name: newdoctor.firstName + " " + newdoctor.lastName,
        },
        onClickPath: "/admin/doctors-list",
      });
      await User.findByIdAndUpdate(adminUser._id, { unseenNotifications }); //admin 'user'
      res.status(200).send({
        success: true,
        message: "Doctor account applied successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  });

router.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        const unseenNotifications = user.unseenNotifications; //get unseen noti prperties
        const seenNotifications = user.seenNotifications; //get seen noti properties

        seenNotifications.push(...unseenNotifications); //push unseen notification to seen notification array
        user.unseenNotifications = []; //empty the seen notification array
        user.seenNotifications = seenNotifications; //assign the notification to seen noti
        
        const updatedUser = await user.save()
        updatedUser.password = undefined;
        res.status(200).send({
            success:true, 
            messaage:"All notifications marked as seen", 
            data:updatedUser
          });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in marking notifications as seen",
        success: false,
        error,
      });
    }
  });

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        user.seenNotifications = [];
        // user.unseenNotifications = []; //removes unseen notifications
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success:true, 
            messaage:"All seen notifications are deleted", 
            data:updatedUser
          });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in deleting seen notifications",
        success: false,
        error,
      });
    }
  });  

module.exports = router;




// try {
//     // Extract data from request body
//     const { name, email, password } = req.body;

//     // Check if user with given email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
// }