import moment from 'moment';

export default class Order {
    constructor (
        id,
        items,
        totalAmount,
        date
    ){
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    getReadableDate() {
        return moment(this.date).format('MM/Do/YYYY hh:mm');
    }
}