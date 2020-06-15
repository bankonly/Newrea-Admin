export default mongoose => {
    const tableName = "seller";
    const schema = new mongoose.Schema(
      {
        name: {
          type: String,
          max: 100,
          default:null
        },
      },
      { collection: tableName, timestamps: true }
    );
    return {
      schema: schema,
      tableName: tableName
    };
  };
  