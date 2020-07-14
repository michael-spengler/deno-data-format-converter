const nestedTagsOfRootTag: Array<
  {
    key: string;
    value: string | null;
    is: number;
    _attrs: { [key: string]: string };
  }
> = [];

export function JSONtoXML(jsonData: { [key: string]: any }): string {
  // Start the basic tag
  let xmlStringArr: string[] = ['<?xml version="1.0" encoding="UTF-8" ?>'];
  // Construct the tags from the keys
  Object.keys(jsonData).forEach((tagName) => { // each root key
    // Empty the nested tags for each root key, we can start from scratch for each root key, otherwise wed be closing tags for the second root key that existed on the first
    nestedTagsOfRootTag.splice(0, nestedTagsOfRootTag.length);
    // Open the tag for each root key
    let startTag = "<" + tagName;
    // If each root key has attributes
    if (jsonData[tagName].hasOwnProperty("_attrs")) {
      Object.keys(jsonData[tagName]["_attrs"]).forEach((attributeKey) => {
        startTag += " " + attributeKey + '="' +
          jsonData[tagName]["_attrs"][attributeKey] + '"';
      });
    }
    // Close off the opening of each root tag, ready for children
    startTag += ">";
    xmlStringArr.push(startTag);

    // For when root key has no children, and only has text
    if (typeof jsonData[tagName].text === "string") {
      xmlStringArr.push("  " + jsonData[tagName].text);
    } else {
      // Nested children, construct what children the root tag has
      traverse(jsonData[tagName], process);
      nestedTagsOfRootTag.forEach((nest, i) => {
        // Create the open tag for each nested tag
        let tagOpening = " ".repeat(nest.is) + "<" + nest.key;
        if (nest._attrs) {
          Object.keys(nest._attrs).forEach((attributeKey) => {
            tagOpening += " " + attributeKey + '="' +
              nest._attrs[attributeKey] + '"';
          });
        }
        tagOpening += ">";
        xmlStringArr.push(tagOpening);

        if (typeof nest.value === "string" && nest.value) { // is text, has no children
          xmlStringArr.push(" ".repeat(nest.is + 2) + nest.value);
        }
      });
    }

    // Now we have traversed through each tag, we can start closing them off
    for (let j = (nestedTagsOfRootTag.length - 1); j !== -1; j--) {
      xmlStringArr.push(
        " ".repeat(nestedTagsOfRootTag[j].is) + "</" +
          nestedTagsOfRootTag[j].key + ">",
      );
    }

    // Close the tag for the root key
    xmlStringArr.push("</" + tagName + ">");
  });
  const xmlString = xmlStringArr.join("\n");
  return xmlString;
}

let indentationSpaces = 2;

function traverse(o: any, func: Function) {
  for (var i in o) {
    if (i === "_attrs") {
      continue;
    }
    if (i === "text") {
      continue;
    }
    func.apply(
        // @ts-ignore
      this,
      [i, o[i].text ? o[i].text : o[i], indentationSpaces, o[i]._attrs],
    );
    if (o[i] !== null && typeof (o[i]) == "object") {
      indentationSpaces = indentationSpaces + 2;
      //going one step down in the object tree!!
      traverse(o[i], func);
    }
  }
}

function process(
  key: string,
  value: string | any,
  indentationSpaces: number,
  attrs: { [key: string]: string },
) {
  nestedTagsOfRootTag.push(
    {
      key,
      value: typeof value === "string" ? value : null,
      is: indentationSpaces,
      _attrs: attrs,
    },
  );
}
