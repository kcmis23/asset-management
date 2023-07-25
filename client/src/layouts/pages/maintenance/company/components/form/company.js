// Libraries
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/Form"; // Context

const Company = () => {
    const { control } = useContext(FormCntxt);

    return ([
        {
            grid: { xs: 12, md: 5 },
            props: {
                name: 'series_no',
                label: '*Series no.',
                disabled: true,
                fetching: false,
            },
            type: 'textfield'
        },
        {
            grid: { xs: 12, sm: 7, md: 5 },
            props: {
                name: 'name',
                label: '*Name',
                disabled: false,
                fetching: false,
            },
            type: 'textfield'
        },
        {
            grid: { xs: 12, sm: 5, md: 2 },
            props: {
                name: 'telephone',
                label: 'Telephone',
                disabled: false,
                fetching: false,
            },
            type: 'textfield'
        },
        {
            grid: { xs: 12 },
            props: {
                name: 'description',
                label: 'Description',
                disabled: false,
                fetching: false,
            },
            type: 'textarea'
        },
        {
            grid: { xs: 12 },
            props: {
                name: 'address',
                label: 'Address',
                disabled: false,
                fetching: false,
            },
            type: 'textarea'
        },
        {
            grid: { xs: 12 },
            props: {
                name: 'status',
                label: 'Status',
                disabled: false,
                fetching: false,
                control: control
            },
            type: 'switch'
        }
    ]);
}

export default Company;