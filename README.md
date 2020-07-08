<p align="center">
  <h1 align="center">Deno Data Format Converter</h1>
</p>
<p align="center">
  <a href="https://github.com/ebebbington/deno-data-format-converter/releases">
    <img src="https://img.shields.io/github/release/ebebbington/deno-data-format-converter.svg?color=bright_green&label=latest">
  </a>
  <a href="https://github.com/ebebbington/deno-data-format-converter/actions">
    <img src="https://img.shields.io/github/workflow/status/ebebbington/deno-data-format-converter/master?label=ci">
  </a>
</p>

---

# Contents

* [CSV to JSON](#csv-to-json)
    * [Converting a CSV String](#converting-a-csv-string)
* [JSON to CSV](#json-to-csv)
    * [Converting a JSON Object](#converting-a-json-object)
* [JSON to XML](#json-to-xml)
* [XML to JSON](#xml-to-json)

# CSV to JSON

Converts a CSV string to JSON

## Converting a CSV String

```typescript
import { CSVtoJSON } from "https://deno.land/x/data-format-converter@v1.0.0/mod.ts";
const csvString =
  "name, age, year\n" +
  "John Doe, 33, 1990\n" +
  "Jane Doe, 31, 1989";
const result = CSVtoJSON(csvString) // [ ["name", "age", "dob"], ["John Doe", ...], ["Jane Doe", ...] ]
```

# JSON to CSV

Converts a JSON object to CSV

## Converting a JSON object
 
```typescript
import { JSONtoCSV } from "https://deno.land/x/data-format-converter@v1.0.0/mod.ts";
const json = [
  [
    "name", "age", "year"
  ],
  [
    "John Doe", "33", "1990"
  ],
  [
    "Jane Doe", 31, 1989
  ]
];
const result = JSONtoCSV(json) // "name, age, dob\n John Doe, 33, 1990\n Jane Doe, 31, 1989"
```

# JSON to XML

Not yet supported

# XML to JSON

Not yet supported
