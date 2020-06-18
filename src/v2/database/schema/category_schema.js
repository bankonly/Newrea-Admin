export default mongoose => {
  const tableName = "category";
  const schema = new mongoose.Schema(
    {
      parent_id: {
        type: Schema.Types.ObjectId,
        ref: "category",
        default: null
      },
      name: {
        type: String,
        required: true
      },
      slug_name: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      },
      is_active: {
        type: String,
        required: true,
        default: "active"
      },
      created_date: {
        type: Date,
        default: Date.now()
      }
    },
    { collection: tableName }
  );
  return {
    schema: schema,
    tableName: tableName
  };
};
