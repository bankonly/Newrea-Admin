const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DropShipModelSchema = new Schema({
    customer_id: {type: String, required: true},
    driver_id:{type: Object, required: true, },
    pick_up_loc_lat_Ing:{type: String, required: true, },
    drop_off_loc_lat_Ing:{type: String, required: true, },
    pick_up_loc:{type: String, required: true, },
    drop_off_loc:{type: String, required: true, },
    item_id:{type: Object, required: true, },
    item_pics:{type: String, required: true, },
    price:{type: Number, required: true, },
    pick_up_time:{type: String, required: true, },
    pick_up_date:{type: Date, required: true, },
    delivery_date:{type: Date, required: true, },
    delivery_time:{type: String, required: true, },
    driver_note:{type: String, required: true, },
    sender_name:{type: String, required: true, },
    sender_phone:{type: Number, required: true, },
    receiver_name:{type: String, required: true, },
    receiver_phone:{type: Number, required: true, },
    cash_paymen_method:{type: String, required: true, },
    driver_name:{type: String, required: true, },
    distance_travelled:{type: String, required: true, },
    driver_phone:{type: Number, required: true, },
    is_active:{type: Boolean, required: true, },
    order_date:{type: Date, required: true, },
    driver_rating:{type: String, required: true, },
},{timestamps: true});



module.exports = mongoose.model('DropShipOrder', DropShipModelSchema,'drop_ship_order');