export function JSONtoCSV (jsonData: Array<Array<string|number>>): string {
  const titles = jsonData[0];
  jsonData.splice(0, 1);
  const rows = jsonData;
  let str = "";
  titles.forEach((title, i) => {
    str += title;
    if  (titles[i] === titles[titles.length - 1]) { // last title
      str += "\r\n";
    } else {
      str += ", "
    }
  });
  rows.forEach((row, i) => {
    let tmp = row.toString(); // "Jane Doe,31,1989"
    tmp = tmp.replace(/,/g, ', ')
    str += tmp + "\r\n";
  });
  return str
}