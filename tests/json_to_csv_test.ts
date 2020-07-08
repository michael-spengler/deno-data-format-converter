import { JSONtoCSV } from "../src/json_to_csv.ts";
import { assertEquals } from "./deps.ts"

Deno.test({
  name: "CSV to JSON",
  fn(): void {
    const json = [
        [
            "name", "age", "year"
        ],
        [
            "John Doe", 33, 1990
        ],
        [
            "Jane Doe", 31, 1989
        ]
    ]
    const result = JSONtoCSV(json)
    assertEquals(result,
        "name, age, year\n" +
        "John Doe, 33, 1990\n" +
        "Jane Doe, 31, 1989\n"
    )
  }
})