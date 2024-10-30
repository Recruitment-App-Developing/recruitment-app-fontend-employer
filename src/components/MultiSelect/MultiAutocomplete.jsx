import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete, MenuItem, TextField } from '@mui/material';

export default function MultiAutocomplete({
    value = [],
    onChange,
    width = '100%',
    itemList,
    label = '',
}) {
    return (
        <Autocomplete
            value={value}
            onChange={onChange}
            sx={{ m: 1, width: width }}
            limitTags={2}
            multiple
            options={itemList}
            getOptionLabel={(option) => option.name}
            defaultValue={[itemList[0]]}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{ justifyContent: 'space-between' }}
                    {...props}
                >
                    {option.name}
                    {selected ? (
                        <FontAwesomeIcon className="ml-3" icon={faCheck} />
                    ) : null}
                </MenuItem>
            )}
            renderInput={(params) => (
                <TextField
                    key={params.id}
                    {...params}
                    variant="outlined"
                    label={label}
                />
            )}
            ListboxProps={{
                style: {
                    maxHeight: '300px', // Giới hạn chiều cao của danh sách
                },
            }}
        />
    );
}
