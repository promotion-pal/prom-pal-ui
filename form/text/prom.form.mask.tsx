const promMaskTelegram = (val: string): string => {
    if (!val) return val;

    const url = "https://t.me/";
    const cleaned = val.trim();

    if (cleaned.startsWith("@")) {
        const username = cleaned.slice(1);
        return url + username;
    }

    if (
        !cleaned.includes(".") &&
        !cleaned.includes("/") &&
        !cleaned.includes(":")
    ) {
        return url + cleaned;
    }

    if (cleaned.includes("t.me/")) {
        if (!cleaned.startsWith("http")) {
            return `https://${cleaned}`;
        }
        return cleaned;
    }

    return cleaned;
};

const promMaskWhatsapp = (val: string): string => {
    if (!val) return val;

    const cleaned = val.trim();

    if (cleaned.match(/^[\+]?[0-9\s\-\(\)]+$/)) {
        const phone = cleaned.replace(/[^\d+]/g, "");

        let normalizedPhone = phone;
        if (phone.startsWith("8")) {
            normalizedPhone = "+7" + phone.slice(1);
        } else if (phone.startsWith("7") && !phone.startsWith("+7")) {
            normalizedPhone = "+" + phone;
        } else if (!phone.startsWith("+") && phone.length >= 10) {
            normalizedPhone = "+7" + phone.slice(-10);
        }

        return `https://wa.me/${normalizedPhone.replace("+", "")}`;
    }

    if (cleaned.includes("wa.me/")) {
        if (!cleaned.startsWith("http")) {
            return `https://${cleaned}`;
        }
        return cleaned;
    }

    if (cleaned.includes("whatsapp://")) {
        const phoneMatch = cleaned.match(/whatsapp:\/\/send\?phone=(\d+)/);
        if (phoneMatch) {
            return `https://wa.me/${phoneMatch[1]}`;
        }
    }

    return cleaned;
};

const promMaskPhone = (val: string): string => {
    const cleaned = val.replace(/[^\d+]/g, "");
    if (!cleaned.startsWith("+7")) {
        return "+7";
    }
    return cleaned;
};

const promMaskPhoneWithoutPlus = (val: string): string => {
    const cleaned = val.replace(/[^\d+]/g, "");
    if (!cleaned.startsWith("8")) {
        return "8";
    }
    return cleaned;
};

const promMaskEmail = (val: string): string => {
    if (!val) return val;

    const cleaned = val.trim().toLowerCase();

    const popularDomains = [
        "gmail.com",
        "yandex.ru",
        "mail.ru",
        "yahoo.com",
        "outlook.com",
    ];

    if (!cleaned.includes("@") && cleaned.length > 0) {
        const matchingDomain = popularDomains.find(
            (domain) => domain.startsWith(cleaned) && cleaned.length >= 2,
        );

        if (matchingDomain) {
            return matchingDomain;
        }

        if (cleaned.includes(".") && !cleaned.includes(" ")) {
            const parts = cleaned.split(".");
            if (parts.length === 2 && parts[0].length > 0 && parts[1].length > 0) {
                return `${parts[0]}@${parts[1]}`;
            }
        }

        return cleaned;
    }

    if (cleaned.includes("@")) {
        const [localPart, domainPart] = cleaned.split("@");

        if (domainPart && domainPart.length > 0) {
            const matchingDomain = popularDomains.find((domain) =>
                domain.startsWith(domainPart),
            );

            if (matchingDomain && domainPart.length < matchingDomain.length) {
                return `${localPart}@${matchingDomain}`;
            }
        }
    }

    return cleaned;
};

const promMaskCardNumber = (val: string): string => {
    const digits = val.replace(/\D/g, "").substring(0, 16);
    if (digits.startsWith("34") || digits.startsWith("37")) {
        const amexMatch = digits.match(/^(\d{1,4})(\d{0,6})(\d{0,5})$/);
        if (amexMatch) {
            return [amexMatch[1], amexMatch[2], amexMatch[3]].filter(Boolean).join(" ");
        }
    }
    const match = digits.match(/.{1,4}/g);
    return match ? match.join(" ") : digits;
};

const promMaskDate = (val: string): string => {
    let digits = val.replace(/\D/g, "").substring(0, 8);
    if (digits.length >= 1 && !/^[0-3]/.test(digits[0])) digits = "";
    if (digits.length >= 2 && parseInt(digits.substring(0, 2)) > 31) digits = "31" + digits.substring(2);
    if (digits.length >= 3 && !/^[0-1]/.test(digits[2])) digits = digits.substring(0, 2);
    if (digits.length >= 4 && parseInt(digits.substring(2, 4)) > 12) {
        digits = digits.substring(0, 2) + "12" + digits.substring(4);
    }

    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
};

const promMaskMoney = (val: string): string => {
    if (!val) return "";
    let cleaned = val.replace(/,/g, ".").replace(/[^\d.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
        cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    const [integerPart, decimalPart] = cleaned.split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (decimalPart !== undefined) {
        return `${formattedInteger}.${decimalPart.substring(0, 2)}`;
    }

    return formattedInteger;
};

const promMaskINN = (val: string): string => {
    return val.replace(/\D/g, "").substring(0, 12);
};

const promMaskSnils = (val: string): string => {
    const digits = val.replace(/\D/g, "").substring(0, 11);
    const parts = [];
    if (digits.length > 0) parts.push(digits.substring(0, 3));
    if (digits.length > 3) parts.push(digits.substring(3, 6));
    if (digits.length > 6) parts.push(digits.substring(6, 9));

    let result = parts.filter(Boolean).join("-");
    if (digits.length > 9) {
        result += " " + digits.substring(9, 11);
    }
    return result;
};

const promMaskFIO = (val: string): string => {
    let cleaned = val.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "");
    cleaned = cleaned.replace(/\s+/g, " ").replace(/-+/g, "-");
    return cleaned;
};


export {
    promMaskINN,
    promMaskFIO,
    promMaskDate,
    promMaskEmail,
    promMaskPhone,
    promMaskSnils,
    promMaskMoney,
    promMaskTelegram,
    promMaskWhatsapp,
    promMaskCardNumber,
    promMaskPhoneWithoutPlus,
};