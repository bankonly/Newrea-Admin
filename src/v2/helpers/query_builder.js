import { mode } from "crypto-js";

export const updateOne = (model, id, updateData) => {
  return model.updateOne({ _id: id }, { $set: updateData });
};

export const deleteOne = (model, id) => {
  return model.findByIdAndDelete(id);
};

export const isIdExist = (model, id) => {
  return model.findById(id);
};

export const getData = (model, id = null, many = false) => {
  if (id == null) {
    return model.find();
  } else {
    if (many) {
      return model.find({ _id: id });
    }
    return model.findOne({ _id: id });
  }
};
