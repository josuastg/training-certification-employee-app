import moment from 'moment';
const formatDate = (date, format = "D MMMM YYYY") => {
    const result = moment(date)
    moment.locale('id');
    return result.format(format)
}

export default formatDate;