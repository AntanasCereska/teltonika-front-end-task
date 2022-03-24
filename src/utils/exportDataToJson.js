export const exportDataToJsonFile = (fileData, fileName) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(fileData)
  )}`;
  const file = document.createElement("a");
  file.href = jsonString;
  file.download = `${fileName}.json`;

  file.click();
};
