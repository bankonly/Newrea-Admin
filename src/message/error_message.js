const login_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ເຂົ້າສູລະບົບບໍ່ສຳເລັດ! ກະລຸນາລອງໃໝອິກຄັ້ງ"
    },
    en: {
        title: "Warning!",
        message: "Login Failure! please try again."
    }
}
const passMismatch_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ! ກະລຸນາລອງ ໃໝ່ ອີກຄັ້ງ."
    },
    en: {
        title: "Warning!",
        message: "Password incorrect! please try again."
    }
}
const somethingWrn_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ມີບາງຢ່າງຜິດປົກກະຕິ! ກະລຸນາລອງ ໃໝ່ ອີກຄັ້ງ"
    },
    en: {
        title: "Warning!",
        message: "Something went wrong! please try again"
    }
}
const internetCheck_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ກະລຸນາເຊື່ອມຕໍ່ອິນເຕີເນັດແລະລອງໃໝ່ອີກຄັ້ງ!"
    },
    en: {
        title: "Warning!",
        message: "Please connect to internet and try again!"
    }
}
const userAlreadyExt_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ຊື່ຜູ້ໃຊ້ມີຢູ່ແລ້ວ!"
    },
    en: {
        title: "Warning!",
        message: "User Name alraedy exits!"
    }
}
const logoMissing_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ກະລຸນາໃສຮູບໂກໂລ ແລະ ຮູບໂປໄຟເພື່ອດຳເນີນການ!"
    },
    en: {
        title: "Warning!",
        message: "Please attach logo and profile image to proceed!"
    }
}
const selNotFound_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ຜູ້ຂາຍບໍ່ພົບ!"
    },
    en: {
        title: "Warning!",
        message: "Seller Not Found!"
    }
}
const imgReq_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ບໍ່ມີຊ່ອງຂໍ້ມູນຮູບພາບ!"
    },
    en: {
        title: "Warning!",
        message: "Image field is required!"
    }
}

const addProdFail_error = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ສິນຄ້າບໍ່ສາມາດເພີ່ມໄດ້!"
    },
    en: {
        title: "Warning!",
        message: "Product can not be added!"
    }
}
const delProd_fail = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ສິນຄ້າບໍ່ສາມາດລຶບໄດ້!"
    },
    en: {
        title: "Warning!",
        message: "Product can not be deleted!"
    }
}

const updateProfile_fail = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ບໍ່ສາມາດອັບເດດໂປຟາຍໄດ້ໃນຂະນະນີ້!"
    },
    en: {
        title: "Warning!",
        message: "Update Profile Failure!"
    }
}

const updateProduct_fail = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ເກີດບັນຫາໃນການແກ້ໄຂສິນຄ້າ!"
    },
    en: {
        title: "Warning!",
        message: "Product update fail!"
    }
}


const sellerTypeReq_fail = {
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ກະລຸນາໃສ່ຊື່ປະເພດຮ້ານຄ້າ!"
    },
    en: {
        title: "Warning!",
        message: "Please enter a store type name!"
    }
}

const trysellerType_fail={
    
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ກະລຸນາປ້ອນຊື່ປະເພດຮ້ານຄ້າອີກຄັ້ງ!"
    },
    en: {
        title: "Warning!",
        message: "Please enter a store type name again"
    }
}
const dataNotFound_fail={
    
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ບໍ່ພົບຂໍ້ມູນ!"
    },
    en: {
        title: "Warning!",
        message: "No data found!"
    }
}
const sellerTypeUpdated_fail={
    
    success: false,
    la: {
        title: "ເຕືອນ!",
        message: "ເກີດຂໍ້ຜິດພາດໃນການແກ້ໄຂປະເພດຮ້ານຄ້າ!"
    },
    en: {
        title: "Warning!",
        message: "Seller type update fail!"
    }
}


export {
    login_error,
    trysellerType_fail,
    sellerTypeReq_fail,
    userAlreadyExt_error,
    dataNotFound_fail,
    internetCheck_error,
    somethingWrn_error,
    passMismatch_error,
    logoMissing_error,
    imgReq_error,
    addProdFail_error,
    selNotFound_error,
    delProd_fail,
    updateProduct_fail,
    sellerTypeUpdated_fail
}