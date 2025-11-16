function getLatestVersion(versions) {
  return versions.sort((a, b) => {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
      if (aParts[i] > bParts[i]) return -1; // a is newer
      if (aParts[i] < bParts[i]) return 1;  // b is newer
    }
    return 0; // equal
  })[0];
}
console.log(getLatestVersion(["1.0.0", "1.0.1"]))

const path = require("path");

console.log(path.parse(__filename))