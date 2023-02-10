const isValid = ({name, number, code}) => {
  const validName = /^[a-z]+\s[a-z]+$/i;
  const validNumber = /^\d{16}$/;
  const validCode = /^\d{3,4}$/;

  return validName.test(name) && validNumber.test(number) && validCode.test(code);
};

export default isValid;
