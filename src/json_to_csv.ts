/**
 * Example:
 *     const json = [ ["name", "age", "year"], ["John Doe", ...] ]
 *     JSONtoCSV(json) // "name, age, year\n John Doe, 33, 1990"
 *
 * @param Array<Array<string>> jsonData
 *
 * @return string
 */
export function JSONtoCSV(jsonData: Array<Array<string | number>>): string {
  const titles = jsonData[0];
  jsonData.splice(0, 1);
  const rows = jsonData;
  let str = "";
  titles.forEach((title, i) => {
    str += title;
    if (titles[i] === titles[titles.length - 1]) { // last title
      str += "\n";
    } else {
      str += ", ";
    }
  });
  rows.forEach((row, i) => {
    let tmp = row.toString(); // "Jane Doe,31,1989"
    tmp = tmp.replace(/,/g, ", ");
    str += tmp + "\n";
  });
  return str;
}
