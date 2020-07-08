/**
 * Example:
 *     const csvString =
 *       "name, age, year\n" +
 *       "John Doe, 33, 1990"
 *     CSVtoJSON(csvString); // [ ["name", "age", "year"], ["John Doe", ...] ]
 *
 * @param string csvData
 * @return Array<Array<string>>
 */
export function CSVtoJSON (csvData: string): Array<Array<string>> {
  const splitCsv = csvData.split("\n");
  const titles = splitCsv[0].replace(/, /g, "-").split('-')
  splitCsv.shift(); // to remove titles
  if (splitCsv[splitCsv.length - 1] === "") { // to clean up
    splitCsv.pop()
  }
  // Create array of rows
  let rows: Array<Array<string>> = [];
  splitCsv.forEach(rowString => {
    rows.push(rowString.replace(/, /g, "-").split('-'))
  });
  // When only titles are given
  if (!rows || !rows.length) {
    return [
      titles
    ]
  }
  let json: Array<Array<string>> = [];
  json[0] = titles
  rows.forEach((row, i) => {
    json[i + 1] = row
  });
  console.log(json)
  return json
}