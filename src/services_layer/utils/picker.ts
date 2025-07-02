const picker = <T>(origin: T, pick: (keyof T)[]): T => {
  const picked = Object.create({});
  pick.forEach((d) => {
    picked[d] = origin[d];
  });
  return picked;
};
export default picker;
