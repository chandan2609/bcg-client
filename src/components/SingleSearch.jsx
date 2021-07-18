import React from 'react';
import { Paper, InputBase, FormHelperText } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  searchPaper: {
    padding: '2px 10px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
    border: props => (props.error ? '1px solid #f44336' : '1px solid #E9EBF1'),
    '&:focus-within': { border: props => (props.error ? '1px solid #f44336' : '1px solid #36aeea') },
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '0.9375rem',
    '& .MuiInputBase-input': {
      color: props => (props.error ? '#f44336' : '#000000'),
      padding: '0px 5px 2px',
      '&::placeholder': {
        color: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  searchIconButton: {
    padding: 8,
  },
  searchDivider: {
    height: 28,
    margin: 4,
  },
}));

// search bar global component
const SingleSearch = (props) => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper elevation={2} component="form" onSubmit={props.onSearch} className={classes.searchPaper} >
        <InputBase
          onFocus={props.onFocus}
          name="search"
          error={props.error}
          fullWidth
          value={props.search}
          onChange={props.handleSearchInputChange}
          className={classes.searchInput}
          // required
          placeholder={props.placeholder ? props.placeholder : 'Search here'}
          inputProps={{ 'aria-label': 'search invoices' }}
        />
        { props.closeIcon ? (
          <IconButton onClick={props.onClear} className={classes.searchIconButton} aria-label="close">
            {props.closeIcon}
          </IconButton>
        ) : null }
        <IconButton type="submit" className={classes.searchIconButton} aria-label="search">
          <SearchIcon style={{ color: props.error ? '#f44336' : '#17a2b8' }} />
        </IconButton>
      </Paper>
      { props.helperText !== '' ? <FormHelperText style={{ padding: '0 10px' }} error>{props.helperText}</FormHelperText> : null }
    </React.Fragment>
  );
};

SingleSearch.defaultProps = {
  closeIcon: null,
  onClear: () => null,
  onFocus: () => null,
  error: false,
  helperText: '',
};

SingleSearch.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  closeIcon: PropTypes.element,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  search: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  onSearch: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  handleSearchInputChange: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SingleSearch;
