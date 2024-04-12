export const obj2csv = (itemsArray) => {
  const fields = Object.keys(itemsArray[0]);
  return [
    fields,
    ...itemsArray.map((item) => fields.map((field) => item[field])),
  ]
    .map((e) => e.join(","))
    .join("\n");
};
