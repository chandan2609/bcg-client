import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
  textField: {
    height: props => props.height || 10,
    fontSize: props => props.fontSize || 14,
    padding: props => props.padding || '1.04rem 14px',
    fontWeight: props => props.fontWeight || 500,
  },
}));

// text field global component
export default function CustomTextField(props) {
  const classes = useStyles(props.styles);
  /* eslint-disable */
  return (
    <TextField
      {...props}
      label={props.label}
      className={props.className}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      InputProps={{ ...props.InputProps, classes: { input: classes.textField } }}
      name={props.name}
      variant={props.variant}
      error={typeof props.error === 'object' ? Boolean(Object.keys(props.error).length) : props.error}
      onInput={props.onInput}
      inputRef={props.inputRef}
      inputProps={props.inputProps}
      helperText={props.helperText}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      placeholder={props.placeholder}
    />
  );
  /* eslint-disable */
}

CustomTextField.defaultProps = {
  disabled: false,
  fullWidth: true,
  error: false,
  className: '',
  name: '',
  variant: 'outlined',
  helperText: '',
  label: '',
  placeholder: '',
  InputProps: {},
  inputProps: {},
  styles: {},
  onInput: () => null,
  onChange: () => null,
  onBlur: () => null,
  onFocus: () => null,
};

CustomTextField.propTypes = {
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  name: PropTypes.string,
  variant: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  InputProps: PropTypes.objectOf(PropTypes.any),
  inputProps: PropTypes.objectOf(PropTypes.any),
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  styles: PropTypes.objectOf(PropTypes.any),
};
