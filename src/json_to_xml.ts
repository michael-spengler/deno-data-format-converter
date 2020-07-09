import validate = WebAssembly.validate;

const nested: Array<{ key: string, value: string|null, is: number }> = []

export function JSONtoXML (jsonData: {[key: string]: any}): string {
  // Start the basic tags
  let xmlString = ["<?xml version=\"1.0\" encoding=\"UTF-8\" ?>"];
  // Construct the tags from the keys
  Object.keys(jsonData).forEach(key => {
    // Open the tag for each root key
    let startTag = "  <" + key + " "
    if (jsonData.hasOwnProperty("_attrs")) {
      Object.keys(jsonData["_attrs"]).forEach(k => {
        startTag += k + "=\"" + jsonData["_attrs"][k] + "\""
      })
    }
    startTag += ">"
    xmlString.push(startTag);
    // skip when root key has attribs

    if (key === "_attrs") {
      return
    }
    // For when root key is a single value eg no nested
    if (typeof jsonData[key] === "string") {
      xmlString.push("    " + jsonData[key])
    } else {
      // Nested keys
      traverse(jsonData[key], process)
      // FIXME :: Need to close of tags, see output of xmlString
      // TODO :: Need to add attribs to nested tags
      nested.forEach(nest => {
        xmlString.push(" ".repeat(nest.is) + "<" + nest.key + ">")
        if (typeof nest.value === "string") {
          xmlString.push(" ".repeat(nest.is + 2) + nest.value)
          xmlString.push(" ".repeat(nest.is) + "</" + nest.key + ">")
        }
      })
    }

    // Close the tag for the root key
    xmlString.push("  </" + key + ">");
    console.log(xmlString)
  })
  return xmlString.join("\n")
}

let indentationSpaces = 6

function traverse(o: any, func: Function) {
  for (var i in o) {
    if (i === "_attrs") {
      continue
    }
    // @ts-ignore
    func.apply(this, [i, o[i], indentationSpaces]);
    if (o[i] !== null && typeof (o[i]) == "object") {
      indentationSpaces = indentationSpaces + 2;
      //going one step down in the object tree!!
      traverse(o[i], func);
    }
  }
}

function process (key: string, value: string|any, indentationSpaces: number) {
  nested.push({ key, value: typeof value === "string" ? value : null, is: indentationSpaces })
}

// function getNested (obj: {[key: string]: any}, key) {
//   for (const nestedKey in obj[key]) {
//     if (obj[key].hasOwnProperty(nestedKey)) {
//
//     }
//   }
// }
//
// // im a noob...
// // https://stackoverflow.com/questions/8085004/iterate-through-nested-javascript-objects
// var findObjectByLabel = function(obj, label) {
//   if(obj.label === label) { return obj; }
//   for(var i in obj) {
//     if(obj.hasOwnProperty(i)){
//       var foundLabel = findObjectByLabel(obj[i], label);
//       if(foundLabel) { return foundLabel; }
//     }
//   }
//   return null;
// };

var obj = {
  name: {
    age: {
      place: {
        title: "ed"
      }
    }
  },
  _attrs: {
    a: "a"
  }
}

JSONtoXML(obj)