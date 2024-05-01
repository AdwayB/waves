import { ChangeEvent, FC } from 'react';
import { InputField } from '../InputField';
import styles from './search.module.scss';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

/**
 * A Search field component.
 *
 * @param {SearchProps} props - The props for the Search component.
 */
const Search: FC<SearchProps> = (props) => {
  const { placeholder = 'Search', value, onChange, className } = props;

  return (
    <div className={`${styles.searchWrapper} ${className}`}>
      <div className={styles.searchInputWrapper}>
        <InputField label={placeholder} value={value} onChange={onChange} isSearch />
      </div>
      <SearchIcon color="inherit" className={styles.searchIcon} />
    </div>
  );
};

export { Search };
export type { SearchProps };
