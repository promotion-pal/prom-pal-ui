const promAllowedPatternUrlSocial = /^[a-zA-Z0-9_@:\/\.\-]*$/;
const promAllowedPatternOnlyRu = /^[а-яёА-ЯЁ]*$/;
const promAllowedPatternPhone = /^\+7\d{0,10}$/;
const promAllowedPatternPhoneWithoutPlus = /^8\d{0,10}$/;
const promAllowedPatternEmail = /^[a-zA-Z0-9._%+-@]*$/;
const promAllowedPatternNaturalNumbers = /^[0-9]*$/;

export {
  promAllowedPatternEmail,
  promAllowedPatternPhone,
  promAllowedPatternOnlyRu,
  promAllowedPatternUrlSocial,
  promAllowedPatternNaturalNumbers,
  promAllowedPatternPhoneWithoutPlus,
};
