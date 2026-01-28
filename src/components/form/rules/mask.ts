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

export {
  promMaskEmail,
  promMaskPhone,
  promMaskTelegram,
  promMaskWhatsapp,
  promMaskPhoneWithoutPlus,
};
