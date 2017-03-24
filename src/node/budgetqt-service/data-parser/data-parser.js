const currentDate = Date.now();

// CSV-Entry -> Expense
export default function({
    entry,
    Expense
}) {
    let arr = Object.keys(entry).map(key => entry[key]);
    let dates = [];
    let tags = [];
    let amounts = [];
    arr.map((val) => {
        let tempDate = Date.parse(val);
        if (tempDate) {
            dates.push(tempDate);
        }
        else if (parseInt(val) || parseFloat(val)) {
            let amount = Math.abs(val * 1);
            amounts.push(val);
        }
        else {
            tags.push(val);
        }
    });
    console.log(amounts);
    let expense = new Expense({amount:amounts[0],tags:tags,date:dates[0]});
    expense.save(function(err) {
        if (err) {
            //console.log(err);
        }
    });
}