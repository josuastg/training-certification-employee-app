const normalizePhoneNumber = (phoneNumber) => {
    const pattern = /^.*?\+?0*62(\d{0,3})(\d{0,4})(\d{0,6})(?!\d).*$/gm;
    const formattedPhoneNumber = phoneNumber.replace(pattern, "0$1-$2-$3");
    return formattedPhoneNumber.endsWith("-")
        ? formattedPhoneNumber.slice(0, -1)
        : formattedPhoneNumber;
};
export default normalizePhoneNumber;