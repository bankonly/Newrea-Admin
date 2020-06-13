import Change_password from "./../models/Change_password";
import { send_noti_on_change_password } from './notification'
const save_change_password = async (data) => {
    // console.log(data.data_change)
    try {

        const old_data = await Change_password.findOne({ user_id: data.user_id })
        if (old_data) {
            await Change_password.updateOne({ _id: old_data._id }, { $set: data })
        } else {
            const newData = new Change_password(data)
            newData.save()
                .then(success => {
                    // console.log(success)
                    const notiData = {
                        user_id: data.sell_id,
                        IMEI_UUID: data.IMEI_UUID,
                        target: "Login"
                    }
                    send_noti_on_change_password(notiData)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    } catch (e) {
        console.log(e)
    }
}


// Get change password

const get_change_password = (req, res) => {
    try {
        Change_password.findOne({ user_id: req.params.seller_id })
            .then(success => {
                if (success) {
                    res.status(200).json(success)
                } else {
                    res.status(204).json()
                }
            })
            .catch(e => {
                console.log(e)
                res.status(400).json()
            })
    } catch (e) {
        console.log(e)
        res.status(400).json()
    }
}
export {
    save_change_password,
    get_change_password
}