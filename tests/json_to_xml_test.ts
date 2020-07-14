import { JSONtoXML } from "../src/json_to_xml.ts";
import { assertEquals } from "./deps.ts"

const exampleJson = {
  name: {
    age: {
      place: {
        title: {
          text: "I am text for the title tag"
        }
      },
      _attrs: {
        b: "b"
      }
    },
    _attrs: {
      nameAttr: "I am an attribute for the name tag"
    }
  },
  company: {
    text: "Google Inc.",
    _attrs: {
      id: "5432"
    }
  }
}

Deno.test({
  name: "JSON to XML",
  fn(): void {
    const result = JSONtoXML(exampleJson)
    assertEquals(result,
        "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" +
        '<name nameAttr="I am an attribute for the name tag">\n' +
        '  <age b="b">\n' +
        '    <place>\n' +
        '      <title>\n' +
        '        I am text for the title tag\n' +
        '      </title>\n' +
        '    </place>\n' +
        '  </age>\n' +
        '</name>\n' +
        '<company id="5432">\n' +
        '  Google Inc.\n' +
        '</company>'
    )
  }
})