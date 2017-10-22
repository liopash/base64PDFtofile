let loans = {};
let base64 = require("base64topdf");
let unirest = require("unirest");
let fs = require("fs");
let path = require("path");

if (!process.argv[2]) {
    console.log("File needs to be provided. On each line expecting loan:key.");
    process.exit(0);
}

console.log("Processing...")

file = fs.readFileSync(process.argv[2], "utf8");

file.split("\n").forEach(function(val) {
  loans[val.split(":")[0]] = val.split(":")[1];
});

//console.log(loans);

for (let loan in loans) {
  unirest
    .get("http://192.168.1.161:8080/" + loans[loan])
    .headers({})
    .end(function(response) {
      let decodedBase64 = base64.base64Decode(
        response.body,
        "file" + loan + ".pdf"
      );
      console.log("file" + loan + ".pdf");
    });
}
