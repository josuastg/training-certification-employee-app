const ellipsisString = (text, long) => {
    if (!text) {
        return "";
    }
    return text.length > long ? `${text.substr(0, long)}...` : text;
};
export default ellipsisString;
