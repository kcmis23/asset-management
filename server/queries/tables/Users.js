// Libraries
const encrypt = require('bcrypt');

// Function
const Global = require("../../function/global");
const Builder = require('../../function/builder');
const { generate } = require('../../function/token');

const audit = { series_no: '', table_name: 'tbl_users',  item_id: 0, field: '', previous: null, current: null, action: '', user_id: 0, date: '' }; // Used for audit trail
class Users {
    series = async () =>{ return (await new Builder(`tbl_users`).select().except(`WHERE id= 1`).build()).rows; }
    specific = async id => { 
        let disabled = {};
        let data = (await new Builder(`tbl_users AS usr`)
                            .select(`usr.*, info.*, perm.permission`)
                            .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                            .join({ table: `tbl_users_permission AS perm`, condition: `perm.user_id = usr.id`, type: `LEFT` })
                            .condition(`WHERE usr.id= ${id}`)
                            .build()).rows;

        if(data[0]) {
            for(let key1 in JSON.parse(data[0].permission)) {
                for(let key2 in JSON.parse(data[0].permission)[key1]) {
                    disabled[key2] = !JSON.parse(data[0].permission)[key1][key2].list
                }
            }
    
            data[0]['disabled'] = disabled;
        }
        return data;
    }
    
    logs = async data => {
        return (await new Builder(`tbl_audit_trail AS at`)
                        .select(`at.id, at.series_no AS at_series, at.table_name, at.item_id, at.field, at.previous, at.current, at.action, at.user_id, 
                                    at.date, usr.series_no AS usr_series, info.employee_no, CONCAT(ubi.lname, ', ', ubi.fname) AS ub_name`)
                        .join({ table: `tbl_users AS usr`, condition: `at.item_id = usr.id`, type: `LEFT` })
                        .join({ table: `tbl_users_info AS info`, condition: `at.item_id = info.user_id`, type: `LEFT` })
                        .join({ table: `tbl_users_info AS ubi`, condition: `at.user_id = ubi.user_id`, type: `LEFT` })
                        .condition(`WHERE at.table_name= 'tbl_users' ORDER BY at.date DESC LIMIT 3`)
                        .build()).rows;
    }

    login = async data => {
        let user = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build();

        if(user.rowCount > 0) {
            if(user.rows[0].status === 1) { 
                if(await encrypt.compare(data.password, user.rows[0].password)) { return { result: 'success', token: generate(user.rows[0]), timeout: 3600 } }
                else { return { result: 'error', error: [{ name: 'password', message: 'Incorrect password or email!' }] } }
            }
            else { return { result: 'error', error: [{ name: 'email', message: 'This email is deactivated, please contact the admins to reactivate it again!' }] } }
        }
        else { return { result: 'error', error: [{ name: 'email', message: 'Email doesn`t exist!' }] } }
    }
 
    profile = async id => {
        return (await new Builder(`tbl_users AS usr`)
                        .select(`usr.id, usr.email, usr.user_level, info.employee_no, info.rfid, info.fname, info.mname, info.lname, info.employment_status, info.profile, perm.permission, info.branch`)
                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                        .join({ table: `tbl_users_permission AS perm`, condition: `perm.user_id = usr.id`, type: `LEFT` })
                        .condition(`WHERE usr.id= ${id}`)
                        .build()).rows;
    }

    list = async data => {
        let user = JSON.parse(atob(data.token));
        let branch = (await new Builder(`tbl_users_info`).select(`branch`).condition(`WHERE user_id= ${user.id}`).build()).rows[0].branch;

        return (await new Builder(`tbl_users AS usr`)
                        .select(`usr.id, usr.email, usr.user_level, usr.status, info.employee_no, info.rfid, info.fname, info.mname, info.lname, 
                                    cmp.name AS company, dpt.name AS department, pst.name AS position, info.profile`)
                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                        .join({ table: `tbl_company AS cmp`, condition: `info.company_id = cmp.id`, type: `LEFT` })
                        .join({ table: `tbl_department AS dpt`, condition: `info.department_id = dpt.id`, type: `LEFT` })
                        .join({ table: `tbl_position AS pst `, condition: `info.position_id = pst.id`, type: `LEFT` })
                        .join({ table: `tbl_users_info AS cb`, condition: `usr.created_by = cb.user_id`, type: `LEFT` })
                        .condition(`WHERE ${user.role !== 'superadmin' ? `info.branch= '${branch}' AND` : ''} ${data.searchtxt !== '' ? `(info.fname LIKE '%${(data.searchtxt).toUpperCase()}%' OR info.lname LIKE '%${(data.searchtxt).toUpperCase()}%'
                                            OR info.employee_no LIKE '%${data.searchtxt}%') AND ` : ''}
                                            (usr.id != 1 AND usr.id != ${user.id}) ORDER BY ${data.orderby} ${(data.sort).toUpperCase()}`)
                        .build()).rows;
    }

    search = async data => {
        let user = JSON.parse(atob(data.token));
        let branch = (await new Builder(`tbl_users_info`).select(`branch`).condition(`WHERE user_id= ${user.id}`).build()).rows[0].branch;

        return (await new Builder(`tbl_users AS usr`)
                        .select(`usr.id, usr.email, usr.user_level, usr.status, info.employee_no, info.rfid, info.fname, info.mname, info.lname, 
                                    cmp.name AS company, dpt.name AS department, pst.name AS position, info.profile`)
                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                        .join({ table: `tbl_company AS cmp`, condition: `info.company_id = cmp.id`, type: `LEFT` })
                        .join({ table: `tbl_department AS dpt`, condition: `info.department_id = dpt.id`, type: `LEFT` })
                        .join({ table: `tbl_position AS pst `, condition: `info.position_id = pst.id`, type: `LEFT` })
                        .join({ table: `tbl_users_info AS cb`, condition: `usr.created_by = cb.user_id`, type: `LEFT` })
                        .condition(`WHERE ${user.role !== 'superadmin' ? `info.branch= '${branch}' AND` : ''} ${data.searchtxt !== '' ? `(info.fname LIKE '%${(data.searchtxt).toUpperCase()}%' OR info.lname LIKE '%${(data.searchtxt).toUpperCase()}%'
                                            OR info.employee_no LIKE '%${data.searchtxt}%') AND ` : ''}
                                            (usr.id != 1 AND usr.id != ${user.id}) ORDER BY ${data.orderby} ${(data.sort).toUpperCase()}`)
                        .build()).rows;
    }

    dropdown = async data => {
        switch(data.type) {
            case 'per-position':
                return [{ id: 0, name: '-- SELECT AN ITEM BELOW --' }]
                    .concat((await new Builder(`tbl_users AS usr`)
                                    .select(`usr.id, CONCAT(info.lname, ', ', info.fname) AS name`)
                                    .join({ table: `tbl_users_info AS info`, condition: 'info.user_id = usr.id', type: `LEFT` })
                                    .condition(`WHERE company_id= ${data.company_id} AND department_id= ${data.department_id} 
                                                        AND position_id= ${data.position_id} AND usr.status= 1 ORDER BY info.lname ASC`).build()).rows)
            default: 
                return [{ id: 0, name: '-- SELECT AN ITEM BELOW --' }]
                    .concat((await new Builder(`tbl_users AS usr`)
                                    .select(`usr.id, CONCAT(info.lname, ', ', info.fname) AS name`)
                                    .join({ table: `tbl_users_info AS info`, condition: 'info.user_id = usr.id', type: `LEFT` })
                                    .condition(`WHERE usr.status= 1 ORDER BY info.lname ASC`).build()).rows);
        }
    }

    save = async data => {
        let count = (await this.series()).length;
        let date = Global.date(new Date());
        let user = JSON.parse(atob(data.token));
        let errors = [];
        
        let email = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build();
        let employeeno = await new Builder(`tbl_users_info`).select().condition(`WHERE employee_no= '${data.employee_no}'`).build();
        let rfid = await new Builder(`tbl_users_info`).select().condition(`WHERE rfid= '${data.rfid}'`).build();
        let name = await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build();

        if(email.rowCount > 0) { errors.push({ name: 'email', message: 'Email already used!' }); }
        if(employeeno.rowCount > 0) { errors.push({ name: 'employee_no', message: 'Employee no already used!' }); }
        if(data.rfid !== '' && rfid.rowCount > 0) { errors.push({ name: 'rfid', message: 'Employee no already used!' }); }
        if(name.rowCount > 0) { errors.push({ name: 'lname', message: 'Name already exist!' }); }

        if(!(errors.length > 0)) {
            let pass = await encrypt.hash(data.password, 10);
            let usr = (await new Builder(`tbl_users`)
                            .insert({ columns: `series_no, email, password, user_level, status, created_by, date_created`, 
                                            values: `'${Global.series({ label: 'USR-', count: count+1, limit: 7 })}', '${data.email}', '${pass}', '${data.user_level}', ${data.status ? 1 : 0}, ${user.id}, '${date}'` })
                            .condition(`RETURNING id`)
                            .build()).rows[0];
                            
            await new Builder(`tbl_users_info`)
                .insert({ columns: `user_id, employee_no, rfid, branch, company_id, department_id, position_id, fname, mname, lname, address, employment_status, profile, gender`, 
                                values: `${usr.id}, '${data.employee_no}', ${data.rfid !== '' ? `'${data.rfid}'` : null}, '${data.branch}', ${data.company_id}, ${data.department_id}, 
                                                ${data.position_id !== undefined ? data.position_id : null}, '${(data.fname).toUpperCase()}', ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null}, 
                                                '${(data.lname).toUpperCase()}', ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, '${data.employment_status}', '${data.profile}', '${data.gender}'` })
                .build();

            await new Builder(`tbl_users_permission`).insert({ columns: `user_id`, values: `${usr.id}` }).build();

            audit.series_no = Global.randomizer(7);
            audit.field = 'all';
            audit.item_id = usr.id;
            audit.action = 'create';
            audit.user_id = user.id;
            audit.date = date;
            
            Global.audit(audit);
            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'error', error: errors } }
    }

    update = async data => {
        let usr = (await new Builder(`tbl_users AS usr`).select()
                            .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` }).condition(`WHERE usr.id= ${data.id}`).build()).rows[0];
        let date = Global.date(new Date());
        let user = JSON.parse(atob(data.token));
        let audits = [];
        let errors = [];

        let email = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build();
        let name = await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build();
        let employeeno = await new Builder(`tbl_users_info`).select().condition(`WHERE employee_no= '${data.employee_no}'`).build();
        let rfid = await new Builder(`tbl_users_info`).select().condition(`WHERE rfid= '${data.rfid}'`).build();

        if(Global.compare(usr.email, data.email)) {
            if(!(email.rowCount > 0)) {
                audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'email', previous: usr.email,
                    current: data.email, action: 'update', user_id: user.id, date: date });
            }
            else { errors.push({ name: 'email', message: 'Email already used!' }); }
        }

        if(Global.compare(usr.fname, data.fname)) {
            if(!(name.rowCount > 0)) {
                audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'first name', previous: usr.fname,
                    current: (data.fname).toUpperCase(), action: 'update', user_id: user.id, date: date });
            }
            else { errors.push({ name: 'fname', message: `First name with surname: ${(data.lname).toUpperCase()} already exist!` }); }
        }

        if(Global.compare(usr.mname, data.mname)) {
            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'middle name', previous: usr.mname,
                current: data.mname !== '' && data.mname !== null ? (data.mname).toUpperCase() : null, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.lname, data.lname)) {
            if(!(name.rowCount > 0)) {
                audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'last name', previous: usr.lname,
                    current: (data.lname).toUpperCase(), action: 'update', user_id: user.id, date: date });
            }
            else { errors.push({ name: 'lname', message: `Name already exist!` }); }
        }

        if(Global.compare(usr.address, data.address)) {
            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'address', previous: usr.address,
                current: data.address !== null && data.address !== '' ? (data.address).toUpperCase() : null, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.employee_no, data.employee_no)) {
            if(!(employeeno.rowCount > 0)) {
                audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'employee no', previous: usr.employee_no,
                    current: data.employee_no, action: 'update', user_id: user.id, date: date });
            }
            else { errors.push({ name: 'employee_no', message: 'Employee no. already used!' }); }
        }

        if(Global.compare(usr.rfid, data.rfid)) {
            if(!(rfid.rowCount > 0)) {
                audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'rfid', previous: usr.rfid,
                    current: data.rfid !== null && data.rfid !== '' ? data.rfid : null, action: 'update', user_id: user.id, date: date });
            }
            else { errors.push({ name: 'rfid', message: 'RFID already used!' }); }
        }

        if(Global.compare(usr.branch, data.branch)) {
            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'branch', previous: usr.branch,
                current: data.branch, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.user_level, data.user_level)) {
            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'user level', previous: usr.user_level,
                current: data.user_level, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.employment_status, data.employment_status)) {
            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'employement status', previous: usr.employment_status,
                current: data.employment_status, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.gender, data.gender)) {
            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'gender', previous: usr.gender,
                current: data.gender, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.profile, data.profile)) {
            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'profile', previous: usr.profile,
                current: data.profile, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.company_id, data.company_id)) {
            let prev = (await new Builder(`tbl_company`).select(`name`).condition(`WHERE id= ${usr.company_id}`).build()).rows[0];
            let curr = (await new Builder(`tbl_company`).select(`name`).condition(`WHERE id= ${data.company_id}`).build()).rows[0];

            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'company', previous: prev.name,
                current: curr.name, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.department_id, data.department_id)) {
            let prev = (await new Builder(`tbl_department`).select(`name`).condition(`WHERE id= ${usr.department_id}`).build()).rows[0];
            let curr = (await new Builder(`tbl_department`).select(`name`).condition(`WHERE id= ${data.department_id}`).build()).rows[0];

            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'department', previous: prev.name,
                current: curr.name, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.position_id, data.position_id)) {
            let prev = (await new Builder(`tbl_position`).select(`name`).condition(`WHERE id= ${usr.position_id}`).build()).rows[0];
            let curr = (await new Builder(`tbl_position`).select(`name`).condition(`WHERE id= ${data.position_id}`).build()).rows[0];

            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'position', previous: prev.name,
                current: curr.name, action: 'update', user_id: user.id, date: date });
        }

        if(Global.compare(usr.status, data.status ? 1 : 0)) {
            audits.push({ series_no: Global.randomizer(7), table_name: 'tbl_users', item_id: usr.id, field: 'status', previous: usr.status === 1 ? 'Active' : 'Inactive', 
                                    current: data.status ? 'Active' : 'Inactive', action: 'update', user_id: user.id, date: date });
        }

        if(!(errors.length > 0)) {
            await new Builder(`tbl_users`)
                .update(`email= '${data.email}', user_level= '${data.user_level}', status= ${data.status ? 1 : 0}, updated_by= ${user.id}, date_updated= '${date}'`)
                .condition(`WHERE id= ${data.id}`)
                .build();
            
            await new Builder(`tbl_users_info`)
                .update(`employee_no= '${data.employee_no}', rfid= ${data.rfid !== null && data.rfid !== '' ? `'${data.rfid}'` : null}, branch= '${data.branch}', 
                                company_id= ${data.company_id}, department_id= ${data.department_id}, position_id= ${data.position_id}, 
                                fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== null && data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                lname= '${(data.lname).toUpperCase()}', address= ${data.address !== '' && data.address !== null ? `'${(data.address).toUpperCase()}'` : null},
                                employment_status= '${data.employment_status}', profile= '${data.profile}', gender= '${data.gender}'`)
                .condition(`WHERE user_id= ${data.id}`)
                .build();

            audits.forEach(data => Global.audit(data));
            return { result: 'success', message: 'Successfully updated!' }
        }
        else { return { result: 'error', error: errors } }
    }

    permission = async data => {
        let date = Global.date(new Date());
        let user = JSON.parse(atob(data.token));

        await new Builder(`tbl_users_permission`)
            .update(`permission= '${JSON.stringify(data.permission)}', updated_by= ${user.id}, date_updated= '${date}'`)
            .condition(`WHERE user_id= ${data.id}`)
            .build();

        return { result: 'success', message: 'Successfully saved!' }
    }
}

module.exports = Users;