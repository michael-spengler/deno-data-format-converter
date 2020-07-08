export function JSONtoXML (jsonData: {[key: string]: any}): string {
  // Start the basic tags
  let xmlString = ["<?xml version=\"1.0\" encoding=\"UTF-8\" ?>"];
  // Construct the tags from the keys
  Object.keys(jsonData).forEach(key => {
    // Open the tag for each root key
    xmlString.push("  <" + key + ">");
    if (typeof jsonData[key] === "string") { // eg could have nested keys
      xmlString.push("    " + jsonData[key])
    } else {
      // Nested keys
      let numberOfNestedKeys = 1
      let reachedEnd = false
      while (reachedEnd !== true) {

      }
    }

    // Close the tag for the root key
    xmlString.push("  </" + key + ">");
  })
  return xmlString.join("\n")
}