const asyncHandler = require("express-async-handler"); //this take cares of exception handling and route the control to the errorHandler.js file
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id }); //by doing this we are connecting the mongodb with the express
  res.status(200).json({ message: "Get all contacts", Contacts: contacts });
});

const createContact = asyncHandler(async (req, res) => {
  //passing the async keyword because when we work with mongo db it returns a promise
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory..");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json({ message: "Create contact", createdContact: contact }); //resource created status code is 201
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({
    message: `Get the contact with id ${req.params.id}`,
    getContact: contact,
  });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== re.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: `Updated the contact with id ${req.params.id}`,
    updatedContact: updatedContact,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contact");
  }
  await Contact.deleteOne({ _id: req.params.id }); //deleteOne method to delete the record
  res.status(200).json({
    message: `Delete the contact with id ${req.params.id}`,
    removedContact: contact,
  });
});

module.exports = {
  getContact,
  getContacts,
  updateContact,
  deleteContact,
  createContact,
};
