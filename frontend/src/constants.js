export const getDoctorFullName = (user) => {
    if (typeof (user) === "number") {
        return user
    }
    return "Dr. " + user.first_name + " " + user.last_name
}

export const getPatientFullName = (user) => {
    if (typeof (user) === "number") {
        return user
    }
    return user.first_name + " " + user.last_name
}

export const getClinicFullName = (user) => {
    if (typeof (user) === "number") {
        return user
    }
    return user.first_name
}

export const getStatus = (status) => {
    switch (status) {
        case 'R':
            return 'Requested'
        case 'C':
            return 'Confirmed'
        case 'S':
            return 'Completed'
        case 'F':
            return 'Failed'
        default:
            break;
    }
    return null
    
}