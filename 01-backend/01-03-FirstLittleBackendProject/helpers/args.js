const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;
  rest.forEach((e, index, array) => {
    if (e.charAt(0) == "-") {
      if (index == array.length - 1) {
        res[e.substring(1)] = true;
      } else if (array[index + 1].charAt(0) != "-") {
        res[e.substring(1)] = array[index + 1];
      } else {
        res[e.substring(1)] = true;
      }
    }
  });
  return res;
};
export { getArgs };
