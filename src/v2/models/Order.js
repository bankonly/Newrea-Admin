import mongoose, { Schema, model } from "mongoose"
import AutoIncrement from "mongoose-sequence";
const orderNumber = AutoIncrement(mongoose)

const orderSchema = new Schema({
    cus_id: {
        type: Schema.Types.ObjectId,
        ref: "customer"
    },
    order_number: {
        type: Number
    },
    discount_money: {
        type: Number
    },
    discount_percentage: {
        type: String
    },
    coin_used: {
        type: String
    },
    delivery_address: [
        {
            latitude: {
                type: String
            },
            longitude: {
                type: String
            }
        }
    ],
    total_price: {
        type: Number
    },
    tax: {
        type: Number
    },
    currency_id: {
        type: Schema.Types.ObjectId,
        ref: "currency"
    },
    invoice_no: {
        type: String
    },
    invoice_date: {
        type: String
    },
    total_discount: {
        type: String
    },
    total_discount_tax: {
        type: String
    },
    total_shipping: {
        type: String
    },
    total_shipping_tax: {
        type: String
    },
    total: {
        type: String
    },
    total_tax: {
        type: String
    },
    delivery_fee_id: {
        type: Schema.Types.ObjectId,
        ref: "delivery_fee"
    },
    delivery_type_id: {
        type: Schema.Types.ObjectId,
        ref: "delivery_type"
    },
    promo_code_id: {
        type: Schema.Types.ObjectId,
        ref: "promo_code"
    },
    driver_id: {
        type: Schema.Types.ObjectId,
        ref: "drivers"
    },
    payment_method_id: {
        type: Schema.Types.ObjectId,
        ref: "payment_method"
    },
    status_id: {
        type: Schema.Types.ObjectId,
        ref: "status"
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
},
    {
        collection: "order"
    }
)
orderSchema.plugin(orderNumber, { inc_field: "order_number" })

const orders = model("order", orderSchema)

export default orders
