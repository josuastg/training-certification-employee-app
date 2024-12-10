const onInitialName = (name) => {
    const initial = name
        .replace(/\s[^a-zA-Z0-9]+/g, " ")
        .trim()
        .split(" ")
        .map((str) => {
            return str ? str[0].toUpperCase() : "";
        })
        .splice(0, 2)
        .join("");

    let color = "";

    if (!name) return "";

    switch (initial.charAt(0)) {
        case "A":
        case "I":
        case "Q":
        case "Y":
            color = "bg-pink-500";
            break;
        case "B":
        case "J":
        case "R":
        case "Z":
            color = "bg-red-500";
            break;
        case "C":
        case "K":
        case "S":
        case "H":
            color = "bg-yellow-500";
            break;
        case "D":
        case "L":
        case "T":
        case "P":
            color = "bg-green-500";
            break;
        case "E":
        case "M":
        case "U":
        case "X":
            color = "bg-blue-500";
            break;
        case "F":
        case "N":
        case "V":
            color = "bg-indigo-500";
            break;
        case "G":
        case "O":
        case "W":
            color = "bg-purple-500";
            break;
        default:
            color = "bg-gray-400";
            break;
    }
    return {
        initial,
        color
    };
};
export default onInitialName;
