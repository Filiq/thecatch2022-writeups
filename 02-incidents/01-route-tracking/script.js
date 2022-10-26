const PATHS = [
  ["000", "002", 4708],
  ["000", "007", 1789],
  ["000", "009", 5274],
  ["000", "010", 2874],
  ["000", "011", 9701],
  ["000", "012", 4362],
  ["000", "014", 4489],
  ["000", "016", 6070],
  ["000", "018", 8065],
  ["000", "022", 1908],
  ["000", "023", 2970],
  ["000", "026", 5810],
  ["000", "027", 8037],
  ["001", "016", 6394],
  ["001", "027", 3721],
  ["002", "000", 4708],
  ["002", "008", 1852],
  ["002", "022", 1844],
  ["003", "012", 6338],
  ["004", "000", 6854],
  ["004", "002", 3195],
  ["004", "020", 2413],
  ["004", "023", 1880],
  ["005", "019", 7682],
  ["006", "000", 8491],
  ["006", "008", 5936],
  ["006", "025", 9298],
  ["006", "027", 3932],
  ["007", "004", 3975],
  ["007", "018", 4978],
  ["007", "020", 5697],
  ["008", "000", 7467],
  ["008", "003", 8287],
  ["008", "007", 7341],
  ["008", "016", 7302],
  ["009", "015", 7335],
  ["009", "023", 2626],
  ["010", "016", 1560],
  ["010", "025", 2594],
  ["011", "013", 2981],
  ["011", "024", 9612],
  ["012", "005", 3831],
  ["012", "027", 6756],
  ["013", "015", 6448],
  ["014", "000", 4489],
  ["014", "017", 3644],
  ["014", "021", 7363],
  ["014", "026", 4984],
  ["015", "001", 8570],
  ["015", "014", 2765],
  ["015", "018", 8648],
  ["016", "000", 6070],
  ["016", "006", 9036],
  ["016", "015", 6568],
  ["016", "026", 4940],
  ["017", "004", 4071],
  ["017", "008", 7625],
  ["018", "004", 1297],
  ["018", "009", 9022],
  ["018", "016", 7710],
  ["018", "023", 1249],
  ["019", "000", 4559],
  ["019", "011", 3196],
  ["020", "001", 9746],
  ["020", "002", 8923],
  ["020", "008", 3480],
  ["020", "019", 6358],
  ["021", "000", 1828],
  ["021", "008", 8653],
  ["022", "007", 9730],
  ["022", "010", 2915],
  ["022", "014", 4126],
  ["023", "002", 4460],
  ["023", "004", 1880],
  ["023", "006", 2328],
  ["023", "014", 1775],
  ["024", "017", 9742],
  ["025", "000", 8585],
  ["026", "016", 4940],
  ["026", "018", 6637],
  ["026", "022", 6237],
  ["026", "025", 2976],
  ["026", "027", 3548],
  ["027", "006", 3932],
  ["027", "020", 8720],
  ["027", "021", 7627],
];

codes = {
  "000": "",
  "001": "W",
  "002": "m",
  "003": "-",
  "004": "I",
  "005": "P",
  "006": "U",
  "007": "-",
  "008": "H",
  "009": "{",
  "010": "U",
  "011": "V",
  "012": "Q",
  "013": "I",
  "014": "L",
  "015": "A",
  "016": "L",
  "017": "h",
  "018": "G",
  "019": "W",
  "020": "h",
  "021": "i",
  "022": "5",
  "023": "S",
  "024": "-",
  "025": "}",
  "026": "F",
  "027": "c",
};

const TOTAL_DISTANCE = 163912;

flag = "";

function searchRecursive(paths, alreadyUsed, distance, flag) {
  // Check if we crossed the total distance
  if (distance > TOTAL_DISTANCE) {
    return;
  }

  // Check if we found the flag
  if (distance === TOTAL_DISTANCE) {
    console.log(flag);
    return;
  }

  paths.forEach((path) => {
    let available = availableRoutes(path[1], alreadyUsed);

    if (flag.length === 0 && codes[path[1]] !== "F") return; // First index must be F

    if (flag.length === 1 && codes[path[1]] !== "L") return; // Second index must be L

    if (flag.length === 2 && codes[path[1]] !== "A") return; // Second index must be A

    if (flag.length === 3 && codes[path[1]] !== "G") return; // Third index must be G

    if (flag.length === 4 && codes[path[1]] !== "{") return; // Fourth index must be {

    if (flag.length >= 5 && flag.length <= 8 && codes[path[1]] === "-") return; // Fifth to eighth index must not be -

    if (flag.length === 9 && codes[path[1]] !== "-") return; // Ninth index must be -

    if (flag.length >= 10 && flag.length <= 13 && codes[path[1]] === "-")
      return; // Tenth to thirteenth index must not be -

    if (flag.length === 14 && codes[path[1]] !== "-") return; // Fourteenth index must be -

    if (flag.length >= 15 && flag.length <= 18 && codes[path[1]] === "-")
      return; // Fifteenth to eightteenth index must not be -

    if (flag.length === 19 && codes[path[1]] !== "-") return; // Nineteenth index must be -

    // Search again recursively
    searchRecursive(
      available,
      alreadyUsed.concat(path[0] === "000" ? [] : path[0]),
      distance + path[2],
      flag + codes[path[1]]
    );
  });
}

// Get all available routes from a given start point
function availableRoutes(from, alreadyUsed) {
  let found = PATHS.filter((path) => path[0] === from);

  return found.filter((path) => !alreadyUsed.includes(path[1]));
}

// Start the search
searchRecursive(availableRoutes("000", []), [], 0, "");
