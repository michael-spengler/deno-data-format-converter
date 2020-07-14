import { CSVtoJSON } from "../src/csv_to_json.ts";
import { assertEquals } from "./deps.ts";

Deno.test({
  name: "CSV to JSON",
  fn(): void {
    const csv = "name, age, year\n" +
      "John Doe, 33, 1990\n" +
      "Jane Doe, 31, 1989\n";
    const result = CSVtoJSON(csv);
    assertEquals(result[0], ["name", "age", "year"]);
    assertEquals(result[1], ["John Doe", "33", "1990"]);
    assertEquals(result[2], ["Jane Doe", "31", "1989"]);
  },
});
