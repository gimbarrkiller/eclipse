import { StylesConfig } from 'react-select';

import { Colors } from 'appConstants';

import { SelectOption } from 'types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customStyles: StylesConfig<SelectOption<any>, false> = {
  option: (provided, { isSelected, isFocused }) => {
    let color = Colors.TEXT_COLOR;
    if (isFocused || isSelected) {
      color = Colors.TEXT_COLOR_BLUE;
    }

    return {
      ...provided,
      color,
      cursor: 'pointer',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: 'none',
      ':active': { color },
    };
  },

  dropdownIndicator: (provided, { isFocused }) => ({
    ...provided,
    width: 20,
    height: 20,
    padding: 0,
    margin: 0,
    fill: Colors.TEXT_COLOR,
    transition: 'transform .3s',
    transform: isFocused ? 'rotate(180deg)' : 'rotate(0)',
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: Colors.GRAY,
    borderColor: Colors.GRAY2,
    borderRadius: 8,
    boxShadow: 'none',
    ':hover': { borderColor: Colors.GRAY2 },
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: '14px 20px',
    cursor: 'pointer',
    color: Colors.TEXT_COLOR,
    fontWeight: 500,
    justifyContent: 'center',
    minWidth: 160,
  }),
  input: (provided) => ({
    ...provided,
    color: Colors.TEXT_COLOR,
    fontWeight: 500,
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    cursor: 'pointer',
    margin: 0,
    svg: {
      alignSelf: 'center',
      fill: Colors.TEXT_COLOR,
    },
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: Colors.GRAY,
    borderRadius: 8,
    color: Colors.TEXT_COLOR,
    fontWeight: 500,
    textAlign: 'center',
  }),

  placeholder: (provided) => ({
    ...provided,
    color: Colors.TEXT_COLOR,
    fontWeight: 500,
  }),

  singleValue: (provided) => ({
    ...provided,
    color: Colors.TEXT_COLOR,
    fontWeight: 500,
    fontSize: 14,
    textAlign: 'center',
  }),

  menuList: (provided) => ({
    ...provided,
    '::-webkit-scrollbar': {
      width: '8px',
      height: '0px',
      borderRadius: 4,
    },
    '::-webkit-scrollbar-track': {
      background: Colors.WHITE,
      borderRadius: 4,
    },
    '::-webkit-scrollbar-thumb': {
      background: Colors.GRAY,
      borderRadius: 4,
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: Colors.BLUE,
    },
    maxHeight: '400px',
    overflow: 'auto',
  }),
};
