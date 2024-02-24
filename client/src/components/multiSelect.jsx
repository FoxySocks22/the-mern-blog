import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function multiSelect({ options }) {
    return (
    <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
    />
    );
}