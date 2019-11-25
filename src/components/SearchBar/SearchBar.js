import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Search } from './components';

const useStyles = makeStyles(theme => ({
  search: {
    flexGrow: 1,
    width: '100%'
  },
  filterButton: {
    marginLeft: 'auto'
  },
  filterIcon: {
    marginRight: theme.spacing(1)
  }
}));

const SearchBar = props => {
  const {onSearch, onChange, defaultValue, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Search
    className={classes.search}
    onSearch={onSearch}
    onChange={onChange}
    defaultValue={defaultValue}
    />
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func
};

export default SearchBar;
