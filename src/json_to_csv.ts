export function JSONtoCSV (jsonData: Array<Array<string>>): string {
  const titles = jsonData[0];
  jsonData.splice(0, 1);
  const rows = jsonData;
  let str = "";
  titles.forEach((title, i) => {
    str += title;
    if  (title[i] === titles[titles.length - 1]) { // last title
      str += "\r\n";
    } else {
      str += ", "
    }
  });
  rows.forEach((row, i) => {
    str += row;
    if  (row[i] === row[titles.length - 1]) { // last title
      str += "\r\n";
    } else {
      str += ", "
    }
  });
  return str
}