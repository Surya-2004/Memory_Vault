const Capsule = require("../models/capsule"); 
const Vault = require("../models/vault"); 
const User = require("../models/user"); 
const { sequelize } = require("sequelize"); 
const mongoose = require("mongoose"); 


exports.getCapsules = async (req, res) => {
  try {
    const { status } = req.query; 
    const filter = status ? { status } : {}; 

    const capsules = await Capsule.find(filter); 

    res.status(200).json(capsules);
  } catch (error) {
    console.error("Error fetching capsules:", error);
    res.status(500).json({ message: "Failed to fetch capsules." });
  }
};

exports.createCapsule = async (req, res) => {
  const sqlTransaction = await sequelize.transaction(); 
  const mongoSession = await mongoose.startSession(); 
  mongoSession.startTransaction(); 

  try {
    const { title, description, content, status, sender_email, receiver_email, anonymous_sender, opening_date } = req.body;

    
    const user = await User.findOne({ where: { email: sender_email }, transaction: sqlTransaction });

    if (!user) {
      await mongoSession.abortTransaction(); 
      await sqlTransaction.rollback(); 
      return res.status(400).json({ message: "Sender email not found." });
    }

    const vault_id = user.vault_id; 

    
    const newCapsule = new Capsule({
      vault_id,
      title,
      description,
      content,
      status,
      sender_email,
      receiver_email,
      anonymous_sender,
    });

    await newCapsule.save({ session: mongoSession }); 

    
    const newVaultEntry = await Vault.create({
      capsule_id: newCapsule._id.toString(), 
      vault_id,
      creation_date: new Date(), 
      opening_date, 
      status: "locked", 
    }, { transaction: sqlTransaction });

    
    await mongoSession.commitTransaction();
    await sqlTransaction.commit();

    res.status(201).json({
      message: "Capsule created successfully.",
      capsule: newCapsule,
      vaultEntry: newVaultEntry,
    });

  } catch (error) {
    console.error("Error creating capsule:", error);

    
    await mongoSession.abortTransaction();
    await sqlTransaction.rollback();

    res.status(500).json({ message: "Failed to create capsule." });
  } finally {
    mongoSession.endSession(); 
  }
};



exports.deleteCapsule = async (req, res) => {
  try {
    const { id } = req.params; 

    
    const result = await Capsule.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Capsule not found." });
    }

    res.status(200).json({ message: "Capsule deleted successfully." });
  } catch (error) {
    console.error("Error deleting capsule:", error);
    res.status(500).json({ message: "Failed to delete capsule." });
  }
};


exports.getCapsulesByUser = async (req, res) => {
  try {
    const { email } = req.params;

    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    
    const capsules = await Capsule.find({ vault_id: user.vault_id });

    res.status(200).json(capsules);
  } catch (error) {
    console.error("Error fetching user's capsules:", error);
    res.status(500).json({ message: "Failed to fetch capsules for user." });
  }
};
