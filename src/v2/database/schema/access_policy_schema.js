export default mongoose => {
  const tableName = "access_policy";
  const schema = new mongoose.Schema(
    /** ref to admin whcih page admin can access */
    /** 1 = full control */
    /** 2 = readonly */
    /** 3 = hidden */
    {
      name:{
        type:String,
        required:true
      },
      admin: {
        type: Number,
        default: 1
      },
      most_popular: {
        type: Number,
        default: 1
      },
      featured_stores: {
        type: Number,
        default: 1
      },
      recommended_item: {
        type: Number,
        default: 1
      },
      catagory: {
        type: Number,
        default: 1
      },
      driver_approved: {
        type: Number,
        default: 1
      },
      banner: {
        type: Number,
        default: 1
      },
      popular_screen: {
        type: Number,
        default: 1
      },
      reason: {
        type: Number,
        default: 1
      },
      is_super_admin:{
        type:Boolean,
        required:true,
      }
    },
    { collection: tableName, timestamps: true }
  );
  return {
    schema: schema,
    tableName: tableName
  };
};
