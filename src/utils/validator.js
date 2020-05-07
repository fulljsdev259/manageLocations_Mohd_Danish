const validator = (data) => {
  let errors = {};
  if (data.addressLine1.trim() === "") {
    errors.addressLine1 = "*required";
  }
//   if (data.states.trim() === "") {
//     errors.states = "*required";
//   }
  if (data.locationName.trim() === "") {
    errors.locationName = "*required";
  }
//   if (data.suiteNo === "") {
//     errors.suiteNo = "*required";
//   }
  if (data.phoneNumber === "") {
    errors.phoneNumber = "*required";
  }else if(data.phoneNumber.length < 10){
    errors.phoneNumber = "Invalid no";
  }
  return errors;
};

export default validator;

export const phoneFormatter = (phone) => {
  //normalize string and remove all unnecessary characters
  phone = phone.replace(/[^\d]/g, "");
  //check if number length equals to 10
  if (phone.length == 10) {
    //reformat and return phone number
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  return null;
};
