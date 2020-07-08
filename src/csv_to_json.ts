export function CSVtoJSON (csvData: string): Array<Array<string|number>> {
  const splitCsv = csvData.split("\n");
  const titles = splitCsv[0].replace(/, /g, "-").split('-')
  splitCsv.shift();
  if (splitCsv[splitCsv.length - 1] === "") {
    splitCsv.pop()
  }
  let rows: Array<Array<string>> = [];
  splitCsv.forEach(rowString => {

    rows.push(rowString.replace(/, /g, "-").split('-'))
  })
  if (!rows || !rows.length) {
    return [
      titles
    ]
  }
  let json: Array<Array<string|number>> = [];
  json[0] = titles
  rows.forEach((row, i) => {
    json[i + 1] = row
  });
  console.log(json)
  return json
}