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
            color = "#ec4899";
            break;
        case "B":
        case "J":
        case "R":
        case "Z":
            color = "#ef4444";
            break;
        case "C":
        case "K":
        case "S":
        case "H":
            color = "#f59e0b";
            break;
        case "D":
        case "L":
        case "T":
        case "P":
            color = "#10b981";
            break;
        case "E":
        case "M":
        case "U":
        case "X":
            color = "#3b82f6";
            break;
        case "F":
        case "N":
        case "V":
            color = "#6366f1";
            break;
        case "G":
        case "O":
        case "W":
            color = "#8b5cf6";
            break;
        default:
            color = "#9ca3af";
            break;
    }
    return {
        initial,
        color
    };
};
export default onInitialName;
