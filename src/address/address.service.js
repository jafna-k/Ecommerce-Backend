
import Address from "./address.model.js";

export const createAddress = async (userId, data) => {
  // Check whether this customer already has an address
  const existingAddress = await Address.findOne({
    user: userId,
  });

  if (existingAddress) {
    throw new Error(
      "Address already exists. Please update your saved address."
    );
  }

  return await Address.create({
    name: data.name,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    isDefault: true,
    user: userId,
  });
};

export const getAddresses = async (userId) => {
  return await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });
};

export const getAddressById = async (userId, id) => {
  const address = await Address.findOne({
    _id: id,
    user: userId,
  });

  if (!address) {
    throw new Error("Address not found");
  }

  return address;
};

export const updateAddress = async (userId, id, data) => {
  const allowedFields = [
    "name",
    "phone",
    "address",
    "city",
    "state",
    "pincode",
  ];

  const updateData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  const savedAddress = await Address.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!savedAddress) {
    throw new Error("Address not found");
  }

  return savedAddress;
};

export const deleteAddress = async (userId, id) => {
  const address = await Address.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!address) {
    throw new Error("Address not found");
  }

  return {
    message: "Address deleted successfully",
  };
};
