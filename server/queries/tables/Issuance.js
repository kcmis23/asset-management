// Function
const Global = require("../../function/global");
const Builder = require('../../function/builder');

const audit = { series_no: '', table_name: 'tbl_stocks_issuance',  item_id: 0, field: '', previous: null, current: null, action: '', user_id: 0, date: '' }; // Used for audit trail
class Issuance {
    series = async () => { return (await new Builder(`tbl_stocks_issuance`).select().build()).rows; }

    list = async data => { return []; }
    logs = async data => { return []; }
}

module.exports = Issuance;