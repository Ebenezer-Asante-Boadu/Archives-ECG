import { readAndDecryptData } from "../lib/user";

export function isPastSevenDays(timeStamp = 'December 23, 2023 18:54:51 UTC') {
    // Replace this with the actual Firebase server timestamp
    const firebaseServerTimestamp = new Date(timeStamp);

    // Check if the timestamp is not valid
    if (isNaN(Number(firebaseServerTimestamp))) { 
        return true;
    }

    // Get the current UTC time
    const currentUtcTime = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = Number(currentUtcTime) - Number(firebaseServerTimestamp);

    // Calculate the difference in days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    // Check if the difference is greater than 7 days
    return daysDifference > 7;
}

export function isUserDataAvailableAndValid(staff_id:string) {
    //checks if user data is available on the machine and it's valid
    try {
        let results = { success: false, value: { staff_id: '', fingerprint: "", date: "", verified:false }, message: 0 };

        const res = readAndDecryptData(staff_id);
        if (res !== null && res !== 5000) {
            if (!isPastSevenDays(res.date)) {
                results.success = true;
                results.value = res;
            }
        } else if (res === 5000) {
            results.message = 5000;
        }
        return results;
    } catch (err) {
        console.log(err)
        return { success: false, value: { staff_id: '', fingerprint: "", date: "", verified:false }, message: 1000 }
    }
}