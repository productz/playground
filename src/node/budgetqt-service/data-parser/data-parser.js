const currentDate = Date.now();

// CSV-Entry -> Expense
export default function({
    entry,
    Expense
}) {
    let arr = Object.keys(entry).map(key => entry[key]);
    let dates = [];
    let tags = [];
    let amount;
    arr.map((val) => {
        let tempDate = Date.parse(val);
        if (tempDate) {
            dates.push(tempDate);
        }
        else if (parseInt(val) || parseFloat(val)) {
            amount = Math.abs(val * 1);
        }
        else {
            tags.push(val);
        }
    });
    console.log(amount,"amount");
    console.log(dates,"dates");
    let expense = new Expense({amount:amount,tags:tags,date:dates[0]});
    expense.save(function(err) {
        if (err) {
            //console.log(err);
        }
    });
}