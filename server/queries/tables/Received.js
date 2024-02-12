// Function
const Global = require("../../function/global");
const Builder = require('../../function/builder');

const audit = { series_no: '', table_name: 'tbl_stocks_issuance',  item_id: 0, field: '', previous: null, current: null, action: '', user_id: 0, date: '' }; // Used for audit trail
class Received {
    specific = async id => {
        return [];
    }

    list = async data => {
        let user = JSON.parse(atob(data.token));

        const columns = `iss.id, iss.series_no, ctg.name AS category, info.serial_no, info.model, CONCAT(it.lname, ', ', it.fname) AS issued_to, 
                                        CONCAT(ib.lname, ', ', ib.fname) AS issued_by, it.employee_no AS it_employee_no, ib.employee_no AS ib_employee_no, 
                                        iss.date_issued, iss.status`;
        const searchtxt = `(iss.series_no LIKE '%${(data.searchtxt).toUpperCase()}%' OR ctg.name LIKE '%${(data.searchtxt).toUpperCase()}%'
                                        OR info.serial_no LIKE '%${(data.searchtxt).toUpperCase()}%' OR info.model LIKE '%${(data.searchtxt).toUpperCase()}%'
                                        OR it.lname LIKE '%${(data.searchtxt).toUpperCase()}%' OR it.fname LIKE '%${(data.searchtxt).toUpperCase()}%' 
                                        OR it.employee_no LIKE '%${(data.searchtxt).toUpperCase()}%'
                                        OR ib.lname LIKE '%${(data.searchtxt).toUpperCase()}%' OR ib.fname LIKE '%${(data.searchtxt).toUpperCase()}%'
                                        OR it.employee_no LIKE '%${(data.searchtxt).toUpperCase()}%')`;
        let condition = '';

        switch(user.role) {
            case 'user':
                condition = `WHERE iss.issued_to= ${user.id} ${data.searchtxt !== '' ? `AND ${searchtxt}` : '' } 
                                        ORDER BY iss.${data.orderby} ${(data.sort).toUpperCase()}`;
                break;
            case 'admin':
                condition = `WHERE (ib.head_id= ${user.id} OR iss.issued_to= ${user.id})
                                        ${data.searchtxt !== '' ? `AND ${searchtxt}` : '' } ORDER BY iss.${data.orderby} ${(data.sort).toUpperCase()}`;
                break;
            default: condition = `${data.searchtxt !== '' ? `WHERE ${searchtxt}` : '' } ORDER BY iss.${data.orderby} ${(data.sort).toUpperCase()}`;
        }

        return (await new Builder(`tbl_stocks_issuance AS iss`)
                        .select(columns)
                        .join({ table: `tbl_stocks AS stck`, condition: `iss.item_id = stck.id`, type: `LEFT` })
                        .join({ table: `tbl_stocks_info AS info`, condition: `iss.item_id = info.stocks_id`, type: `LEFT` })
                        .join({ table: `tbl_category AS ctg`, condition: `stck.category_id = ctg.id`, type: `LEFT` })
                        .join({ table: `tbl_users_info AS it`, condition: `iss.issued_to = it.user_id`, type: `LEFT` })
                        .join({ table: `tbl_users_info AS ib`, condition: `iss.issued_by = ib.user_id`, type: `LEFT` })
                        .condition(condition)
                        .build()).rows;
    }

    excel = async () => {
        return [];
    }

    logs = async () => {
        return [];
    }

    update = async () => {
        return [];
    }
}

module.exports = Received;