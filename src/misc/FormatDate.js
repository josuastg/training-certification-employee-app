import moment from 'moment';
const formatDate = (date, format = "D MMMM YYYY") => {
    let result = moment(date)

    const month = {
        "January": "Januari",
        "February": "Februari",
        "March": "Maret",
        "April": "April",
        "May": "Mei",
        "June": "Juni",
        "July": "Juli",
        "August": "Agustus",
        "September": "September",
        "October": "Oktober",
        "November": "November",
        "December": "Desember"
    }
    moment.locale('id');
    let split = result.format(format).split(" ")
    if (split.length || split !== undefined) {
        result = `${split[0]} ${month[split[1]]} ${split[2]}`;
    }
    return result;
}



export default formatDate;