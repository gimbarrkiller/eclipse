import { StylesConfig } from 'react-select';

import { Colors } from 'appConstants';
import { SelectOption } from 'types';

export const profileCustomStyles: StylesConfig<SelectOption<string>, false> = {
  valueContainer: (provided) => ({
    ...provided,
    height: 64,
    minWidth: 160,
    padding: 20,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: Colors.VIOLET,
    fontWeight: 700,
    fontSize: 14,
    textAlign: 'left',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: Colors.TEXT_COLOR,
    fontWeight: 500,
    fontSize: 14,
  }),

};
