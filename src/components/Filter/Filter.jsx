import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { setFilter } from 'reduxState/filterSlice';
import { selectFilter } from 'reduxState/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectFilter);

  const handleChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      onChange={handleChange}
      value={value}
    />
  );
};
