// Func Add product
async function savePDMaster(data) {
    return data.save()
        .then(success => {
            if (success) {
                return true
            } else {
                return false
            }
        })
        .catch(err => {
            console.log(err)
            return false
        })
}
// Func Add product
async function savePDSeller(data) {
    return data.save()
        .then(success => {
            if (success) {
                return true
            } else {
                return false
            }
        })
        .catch(err => {
            console.log(err)
            return false
        })
}

// Func Add product_option
async function saveProduct_optionData(data) {
    return data.save()
        .then(success => {
            if (success) {
                return true
            } else {
                return false
            }
        })
        .catch(err => {
            console.log(err)
            return false
        })
}

export {
    savePDMaster,
    savePDSeller,
    saveProduct_optionData
}