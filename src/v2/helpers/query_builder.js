export function updateOne(model, id, updateData) {
  return model.updateOne({ _id: id }, { $set: updateData });
}

export function deleteOne(model, id) {
  return model.findByIdAndDelete(id);
}

export function isIdExist(model, id) {
  return model.findById(id);
}

export function getData(model, id = null, many = false) {
  if (id == null) {
    return model.find();
  } else {
    if (many) {
      return model.find({ _id: id });
    }
    return model.findOne({ _id: id });
  }
}

export function deleteIsActive(model, id, is_active = "in_active") {
  return model.updateOne(
    { _id: id },
    { $set: { is_active: is_active } }
  );
}
