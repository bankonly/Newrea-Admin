export default mongoose => {
  const tableName = "admin";
  const schema = new mongoose.Schema(
    {
      name: {
        type: String,
        max: 100,
        required: true
      },
      age: {
        type: Number,
        default: null
      },
      contact: {
        email: {
          type: String,
          required: true
        },
        phone_number: {
          type: String,
          default: null
        }
      },
      is_online: {
        type: String,
        default: "online", // "0 = inactive,1 = active"
        required: true
      },
      block_status: {
        type: Number,
        max: 1,
        default: 0 // "0 = unbanned ,1 = banned"
      },
      password: {
        type: String,
        required: true
      },
      login_count: {
        type: Number,
        default: 0
      },
      access_policy: {
        type: Number,
        enum: [1, 2, 3], // 1 = super admin,2 = editable admin,3 = read only,
        default: 1,
        required: true
      }
    },
    { collection: tableName, timestamps: true }
  );
  return {
    schema: schema,
    tableName: tableName
  };
};
