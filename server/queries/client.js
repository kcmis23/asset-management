// Tables
const Users = require('./tables/Users');
const Company = require('./tables/Company');
const Module = require('./tables/Module');
const Submodule = require('./tables/Submodule');

const login = data => { return new Users().login(data) }
const profile = id => { return new Users().profile(id) }

const series = table => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_company': resolve(await new Company().series()); break;
            case 'tbl_module': resolve(await new Module().series()); break;
            case 'tbl_sub_module': resolve(await new Submodule().series()); break;
        }
    });
}

const specific = (table, id) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_company': resolve(await new Company().specific(id)); break;
            case 'tbl_module': resolve(await new Module().specific(id)); break;
            case 'tbl_sub_module': resolve(await new Submodule().specific(id)); break;
        }
    });
}

const list = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_company': resolve(await new Company().list(data)); break;
            case 'tbl_module': resolve(await new Module().list(data)); break;
            case 'tbl_sub_module': resolve(await new Submodule().list(data)); break;
        }
    });
}

const logs = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_module': resolve(await new Module().logs(data)); break;
            case 'tbl_sub_module': resolve(await new Submodule().logs(data)); break;
        }
    });
}

const save = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_company': resolve(await new Company().save(data)); break;
            case 'tbl_module': resolve(await new Module().save(data)); break;
            case 'tbl_sub_module': resolve(await new Submodule().save(data)); break;
        }
    });
}

const update = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_company': resolve(await new Company().update(data)); break;
            case 'tbl_module': resolve(await new Module().update(data)); break;
            case 'tbl_sub_module': resolve(await new Submodule().update(data)); break;
        }
    });
}

const search = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_company': resolve(await new Company().search(data)); break;
            case 'tbl_module': resolve(await new Module().search(data)); break;
            case 'tbl_sub_module': resolve(await new SubmitEvent().search(data)); break;
        }
    });
}

const dropdown = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_module': resolve(await new Module().dropdown()); break;
        }
    });
}

module.exports = {
    login,
    profile,
    series,
    specific,
    list,
    logs,
    search,
    save,
    update,
    dropdown
}