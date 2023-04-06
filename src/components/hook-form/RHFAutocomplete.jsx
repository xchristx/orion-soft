import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';

export default function RHFAutocomplete({ options = [], renderInput, getOptionLabel, onChange: ignored, name, renderOption, setValue }) {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          renderInput={renderInput}
          onChange={(e, data) => field.onChange(data)}
        />
      )}
      onChange={data => data}
      name={name}
      control={control}
    />
  );
}

RHFAutocomplete.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  renderInput: PropTypes.any,
  getOptionLabel: PropTypes.any,
  control: PropTypes.any,
  renderOption: PropTypes.any,
  onChange: PropTypes.any,
  setValue: PropTypes.any,
};
