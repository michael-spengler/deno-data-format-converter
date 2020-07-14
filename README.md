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
    * [Converting a CSV String to JSON](#converting-a-csv-string-to-json)
* [JSON to CSV](#json-to-csv)
    * [Converting a JSON Object to CSV](#converting-a-json-object-to-csv)
* [JSON to XML](#json-to-xml)
    * [Converting a JSON Object to XML](#converting-a-json-object-to-xml)
* [XML to JSON](#xml-to-json)

# CSV to JSON

Converts a CSV string to JSON

## Converting a CSV String to JSON

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

## Converting a JSON object to CSV
 
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

## Converting a JSON Object to XML

```typescript
import { JSONtoXML } from "https://deno.land/x/data-format-converter@v1.0.0/mod.ts";
const exampleJson = {
  name: {
    age: {
      place: {
        title: {
          text: "I am text for the title tag",
        },
      },
      _attrs: {
        b: "b",
      },
    },
    _attrs: {
      nameAttr: "I am an attribute for the name tag",
    },
  },
  company: {
    text: "Google Inc.",
    _attrs: {
      id: "5432",
    },
  },
};
const result = JSONtoXML(exampleJson);
console.log(result)
//<?xml version="1.0" encoding="UTF-8" ?>
//<name nameAttr="I am an attribute for the name tag">
//  <age b="b">
//    <place>
//      <title>
//        I am text for the title tag
//      </title>
//    </place>
//  </age>
//</name>
//<company id="5432">
//  Google Inc.
//</company>"
```

# XML to JSON

Not yet supported
