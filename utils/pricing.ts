export interface PriceResult {
    amount: number;
    description: string;
}

export function calculatePrice(
    serviceType: string,
    model: string,
    mode: string, // 'hello' or 'passcode'
    knowsICloud: boolean = true
): PriceResult {
    // 1. MDM Bypass
    if (serviceType === 'mdm') {
        return { amount: 80, description: "MDM Bypass Service" };
    }

    // 2. Carrier Unlock
    if (serviceType === 'carrier') {
        return { amount: 49.99, description: "Carrier Unlock Service" };
    }

    // 3. Passcode Removal (Specific Service)
    if (serviceType === 'passcode_removal') {
        if (knowsICloud) {
            return { amount: 29.99, description: "Passcode Removal (iCloud Known)" };
        }
        // If not remembered, use iCloud Unlock pricing logic
        // Continue to the iCloud logic below
    }

    // 4. iCloud Unlock Pricing (and Passcode Removal with unknown iCloud)
    const m = model.toLowerCase();

    // iPad & iPod Pricing
    if (m.includes('ipad') || m.includes('ipod')) {
        const amount = mode === 'hello' ? 80 : 55;
        return {
            amount,
            description: serviceType === 'passcode_removal' ? "iCloud Unlock Process (Passcode Forgotten)" : "iCloud Unlock Service"
        };
    }

    let basePrice = 210; // Default for 16-17 models

    if (m.includes('iphone 4') || (m.includes('iphone 5') && !m.includes('5c') && !m.includes('5s'))) {
        basePrice = 20;
    } else if (m.includes('5s') || m.includes('5c')) {
        basePrice = 20;
    } else if (m.match(/iphone 6/i)) {
        basePrice = 30;
    } else if (m.match(/iphone 7/i)) {
        basePrice = 45;
    } else if (m.match(/iphone 8/i)) {
        basePrice = 49;
    } else if (m.match(/iphone x\s/i) || m.endsWith('iphone x')) {
        basePrice = 45;
    } else if (m.match(/iphone xs/i)) {
        basePrice = 48;
    } else if (m.match(/iphone 11/i)) {
        basePrice = 53;
    } else if (m.match(/iphone 12/i)) {
        basePrice = 60;
    } else if (m.match(/iphone 13/i)) {
        basePrice = 75;
    } else if (m.match(/iphone 14/i)) {
        basePrice = 120;
    } else if (m.match(/iphone 15/i)) {
        basePrice = 150;
    } else if (m.match(/iphone 16/i) || m.match(/iphone 17/i)) {
        basePrice = 210;
    }

    // Apply Passcode Mode reduction for 11-17 series
    let finalAmount = basePrice;
    if (mode === 'passcode' && (m.includes('11') || m.includes('12') || m.includes('13') || m.includes('14') || m.includes('15') || m.includes('16') || m.includes('17'))) {
        finalAmount -= 8;
    }

    return {
        amount: finalAmount,
        description: serviceType === 'passcode_removal' ? "iCloud Unlock Process (Passcode Forgotten)" : "iCloud Unlock Service"
    };
}
