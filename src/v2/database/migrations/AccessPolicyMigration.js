export default mongoose => {
  const tableName = "access_policy";
  const schema = new mongoose.Schema(
    /** ref to admin whcih page admin can access */
    /** 1 = full control */
    /** 2 = readonly */
    /** 3 = hidden */
    {
      admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
      },
      admin: {
        type: Number,
        default: 2
      },
      most_popular: {
        type: Number,
        default: 2
      },
      featured_stores: {
        type: Number,
        default: 2
      },
      recommended_item: {
        type: Number,
        default: 2
      },
      catagory: {
        type: Number,
        default: 2
      },
      driver_approved: {
        type: Number,
        default: 2
      },
      banner: {
        type: Number,
        default: 2
      },
      popular_screen: {
        type: Number,
        default: 2
      },
      reason: {
        type: Number,
        default: 2
      }
    },
    { collection: tableName, timestamps: true }
  );
  return {
    schema: schema,
    tableName: tableName
  };
};
