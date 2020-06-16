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
        phoneNumber: {
          type: String,
          default: null
        }
      },
      is_active: {
        type: Array,
        max: 1,
        default: [1] // "0 = inactive,1 = active"
      },
      status: {
        type: Number,
        max: 1,
        default: 0 // "0 = unbanned ,1 = banned"
      },
      password: {
        type: String,
        required: true
      },
      loginCount: {
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
