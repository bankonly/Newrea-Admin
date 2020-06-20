import mongoose from "mongoose";

const tableName = "most_popular";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: null,
    },
    img: {
      type: String,
      required: true,
    },
    product_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "product_seller",
        required: true,
      },
    ],
    is_active: {
      type: String,
      default: "active",
      required: true,
    },
    created_date: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: tableName }
);

const MostPopular = mongoose.model(tableName, schema);

export { MostPopular };
