/**
 * Validates a 15-digit IMEI number using the Luhn Algorithm.
 */
export function validateIMEI(imei: string): boolean {
    // Check if it's exactly 15 digits
    if (!/^\d{15}$/.test(imei)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 15; i++) {
        let n = parseInt(imei.charAt(i), 10);

        // Double every second digit starting from the second (index 1)
        if (i % 2 !== 0) {
            n *= 2;
            if (n > 9) {
                n -= 9;
            }
        }

        sum += n;
    }

    // A valid IMEI's check sum is divisible by 10
    return sum % 10 === 0;
}
