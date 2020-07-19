const exampleInput =
    '<?xml version="1.0" encoding="UTF-8" ?>\n' +
    '<name nameAttr="I am an attribute for the name tag">\n' +
    '  <age b="b">\n' +
    "    <place>\n" +
    "      <title>\n" +
    "        I am text for the title tag\n" +
    "      </title>\n" +
    "    </place>\n" +
    "    <town>\n" +
    "      hello\n" +
    "    </town>\n" +
    "  </age>\n" +
    "</name>\n" +
    '<company id="5432">\n' +
    "  Google Inc.\n" +
    "</company>";

function getNameFromXMLTag (tag: string): string {
  let name = ""

  // If a closing tag, then return because we dont care
  if (tag.indexOf("</") >= 0) {
    return ""
  }

  // Strip all spaces before the tag start, so we can easily do `tag.indexOf(' ')`
  tag = tag.substring(tag.indexOf("<"));

  // If the tag is text, then return an empty string
  if (tag.indexOf("<") !== 0 || tag.indexOf(">") !== tag.length - 1) {
    return ""
  }

  if (tag.indexOf("=") >= 0) { // has attributes, eg "<country id=...>
    name = tag.substring(tag.indexOf("<") + 1, tag.indexOf(' '))
  } else { // doesn't eg "<country>"
    name = tag.substring(tag.indexOf("<") + 1, tag.indexOf(">"))
  }

  return name
}

function getAttributesFromTag (tag: string): boolean | {[key: string]: string} {
  const attribs: string[]|null = tag.match(/[a-zA-Z]+=\"[A-Za-z0-9 ]+\"/g)
  let ret: {[key: string]: string} = {}
  if (!attribs) {
    return false
  }
  attribs.forEach(attrib => {
    const split = attrib.replace(/\"/g, "").split("=")
    const name = split[0]
    const value = split[1]
    ret[name] = value
  })
  return ret
}

/**
 * Gets the text from a tag IF that tag contains text and no children
 * @param line
 */
function getText (line: string): string {
  if ( (line.indexOf("<") === 0 && line.indexOf(">") === line.length - 1) || line.indexOf("</") === 0 || line.indexOf(">") === line.length -1) {
    return ""
  }
  // If it is text, remove the whitespaces before
  if (line) {
    let tmpSplit = line.match(/[a-zA-Z0-9]*/g)
    if (tmpSplit && tmpSplit.length) {
      tmpSplit = tmpSplit.filter(e => e !== "")
      line = tmpSplit.join(" ")
    }
  }
  return line
}

function a (obj: any, key: string, data: any) {
  if (obj.hasOwnProperty(key)) {
    obj[key] = data
  }
  
}

export function XMLtoJSON (xmlString: string): any {
  // Remove the <?xml ... bit if it exists
  const xmlStringArr: string[] = xmlString.split("\n")
  if (xmlStringArr[0].indexOf("<?xml") >= 0) {
    xmlStringArr.splice(0, 1)
  }
  // Used to add text to a tag, as while reading the text, it's a new line
  let previousTagName = ""
  // Used to track if previous line if parent or not
  let previousLineSpaces = 0
  // TODO(ebebbington) the only thing left  to do, is properly construct  the object, so child tags are within it's parent tag cobject counterpart
  // Iterate over each line
  const json: {[key: string]: any} = {};
  // Keeps track of the current flow of tags, for example adds root tag, then each child is added. Once moved onto another
  let keys = [];
  for (const line of xmlStringArr) {
    const name = getNameFromXMLTag(line)
    const attributes = getAttributesFromTag(line)
    const text = getText(line)
    const spaces = line.search(/\S|$/);

    // Set text on a a tag
    if (!name && !attributes && text) { // is text for the previous line (tag)
      json[previousTagName].value = text
    }

    if (spaces > previousLineSpaces && name && !text) { // is a child  tag
      json[previousTagName][name] = {}
    }


    // Set previous tag name to use next iteration
    previousTagName = name;
    // Then we use spaces to determine if the tag/text is a child or not
    previousLineSpaces = spaces;

    if (!name) {
      continue
    }
    json[name] = {}
    if (attributes) {
      json[name]._attrs = attributes
    }
  }
  console.log(json)
}

const json = XMLtoJSON(exampleInput)
// expect: like: { name: { age: { ..., _attrs: { ...} ... }, coompany: ... }