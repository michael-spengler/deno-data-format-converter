export function CSVtoJSON (csvData: string): Array<Array<string>> {
  const titles = csvData.split("\n")[0].split(',')
  const rows = csvData.split("\n").splice(0, 1)
  let json = []
  json.push(titles)
  rows.forEach(row => {
    json.push(row)
  });
  return json
}