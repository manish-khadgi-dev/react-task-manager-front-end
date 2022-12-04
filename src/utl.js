let length = 5;
const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
export const randomStr = () => {
  let _id = "";

  for (let i = 0; i < length; i++) {
    _id += str[Math.floor(Math.random() * str.length)];
  }
  return _id;
};
