// Libraries
import PropTypes from "prop-types";

const Toner = props => {
    const { register, fetching, errors, control, getValues, setValue } = props;

    return([
        {
            grid: { xs: 12, sm: 6 },
            props: {
                register: register,
                label: 'Model',
                fetching: fetching,
                disabled: true,
                name: 'model',
                errors: errors,
                InputProps: { disableUnderline: true }
            },
            type: 'textfield'
        },
        {
            grid: { xs: 12, sm: 3 },
            props: {
                control: control,
                name: 'type',
                label: 'Type',
                disabled: true,
                fetching: fetching,
                options: [{ id: '', name: '-- SELECT AN ITEM BELOW --' }, { id: 'laser', name: 'LASER JET' }, { id: 'ink', name: 'INK JET' }, { id: 'ribbon', name: 'RIBBON' }],
                onChange: (e, item) => { setValue('type', item.id); },
                errors: errors,
                getValues: getValues
            },
            type: 'dropdown'
        },
        {
            grid: { xs: 12, sm: 3 },
            props: {
                control: control,
                name: 'condition',
                label: 'Condition',
                disabled: true,
                fetching: fetching,
                options: [{ id: '', name: '-- SELECT AN ITEM BELOW --' }, { id: 'original', name: 'ORIGINAL' }, { id: 'rema', name: 'REMANUFACTURED' }],
                onChange: (e, item) => { setValue('condition', item.id); },
                errors: errors,
                getValues: getValues
            },
            type: 'dropdown'
        },
        {
            grid: { xs: 12, sm: 3 },
            props: {
                register: register,
                label: 'Color',
                fetching: fetching,
                disabled: true,
                name: 'color',
                errors: errors,
                InputProps: { disableUnderline: true }
            },
            type: 'textfield'
        },
        {
            grid: { xs: 12, sm: 3 },
            props: {
                register: register,
                label: 'Quantity',
                fetching: fetching,
                disabled: true,
                name: 'quantity',
                errors: errors,
                type: 'number',
                InputProps: { disableUnderline: true },
                inputProps: { min: 1 }
            },
            type: 'textfield'
        }
    ]);
}

Toner.propTypes = {
    register: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    control: PropTypes.node.isRequired,
    getValues: PropTypes.array.isRequired,
    setValue: PropTypes.func.isRequired
}

export default Toner;