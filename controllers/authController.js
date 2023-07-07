import { clientSchema } from "../helpers/ClientSchema.js";
import { registerSchema } from "../helpers/ValidationSchema.js";
import agencyModel from "../models/agencyModel.js";
import JWT from "jsonwebtoken";
import clientModel from "../models/clientModel.js";
import slugify from "slugify";

export const registerController = async (req, res) => {
  try {
    const result = await registerSchema.validateAsync(req.body);
    const Newuser = agencyModel({
      agencyId: result.agencyId,
      agencyname: result.agencyname,
      address1: result.address1,
      address2: result.address2,
      state: result.state,
      city: result.city,
      phoneno: result.phoneno,
    });
    const savedUser = await Newuser.save();

    console.log("saved usr", Newuser);

    res.status(200).json({
      status: "1",
      savedUser,
      message: "Insert sucessfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in Agency",
      error,
    });
  }
};

export const clientController = async (req, res) => {
  try {
    const result = await clientSchema.validateAsync(req.body);
    //check user through agencyid
    const userpresent = await agencyModel.findOne({
      agencyId: result.agencyId,
    });
    const Newuser = clientModel({
      clientId: result.clientId,
      agencyId: result.agencyId,
      name: result.name,
      email: result.email,
      address2: result.address2,
      phoneno: result.phoneno,
      totalbill: result.totalbill,
    });
    const token = await JWT.sign(
      { _id: userpresent._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const savedUser = await Newuser.save();

    console.log("saved usr", Newuser);

    res.status(200).json({
      status: "1",
      savedUser,
      token,
      message: "Insert sucessfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in Client model",
      error,
    });
  }
};

//update Controller
export const updateClientController = async (req, res) => {
  try {
    const { name, email, phoneno, totalbill } = req.body;

    const { id } = req.params;
    const Client = await clientModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), email, phoneno, totalbill },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Client  updated Successfully",
      Client,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in Client",
      error,
    });
  }
};

export const topController = async (req, res) => {
  try {
    const client = await clientModel
      .find()
      .sort({ totalbill: -1 })
      .limit(1)
      .populate("agencyId")
      .exec((err, clients) => {
        if (err) {
          console.error("Error retrieving client(s):", err);
          res.sendStatus(500);
        } else {
          if (clients.length > 0) {
            const topClient = clients[0];
            const response = {
              agencyname: topClient.agencyId,
              name: topClient.name,
              totalbill: topClient.totalbill,
            };
            res.json(response);

            res.status(200).send({
              success: true,
              message: "client  View Successfully",
              response,
              client,
            });
          } else {
            res.sendStatus(404);
          }
        }
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};
