import { FC, useState } from 'react';
import styles from './sortByFilter.module.scss';
import { Select, SelectOptionProps } from '../Select';
import SwapVertIcon from '@mui/icons-material/SwapVert';

type SortMethods = 'date-asc' | 'name-asc' | 'name-desc' | 'artist-asc' | 'artist-desc' | 'rating-asc' | 'rating-desc';
type SortLabels =
  | 'Date Ascending'
  | 'Name Ascending'
  | 'Name Descending'
  | 'Artist Ascending'
  | 'Artist Descending'
  | 'Rating Ascending'
  | 'Rating Descending';

interface SortByFilterProps {
  onSortChange: (value: SortMethods) => void;
}
const sortObjectMap = {
  'Date Ascending': 'date-asc',
  'Name Ascending': 'name-asc',
  'Name Descending': 'name-desc',
  'Artist Ascending': 'artist-asc',
  'Artist Descending': 'artist-desc',
  'Rating Ascending': 'rating-asc',
  'Rating Descending': 'rating-desc',
};

/**
 * A custom sort component that allows for sorting based on name, artist or rating
 *
 * @param {SortByFilterProps} props - The props for the SortByFilter component.
 */
const Sort: FC<SortByFilterProps> = (props) => {
  const { onSortChange } = props;
  const [method, setMethod] = useState<SortLabels>('Date Ascending');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortChange = (event: any) => {
    const newSort = event?.target.value as SortLabels;
    setMethod(newSort);
    onSortChange(sortObjectMap[newSort] as SortMethods);
  };

  const SortOptions: SelectOptionProps[] = [
    {
      value: 'date-asc',
      label: 'Date Ascending',
    },
    {
      value: 'name-asc',
      label: 'Name Ascending',
    },
    {
      value: 'name-desc',
      label: 'Name Descending',
    },
    {
      value: 'artist-asc',
      label: 'Artist Ascending',
    },
    {
      value: 'artist-desc',
      label: 'Artist Descending',
    },
    {
      value: 'rating-asc',
      label: 'Rating Ascending',
    },
    {
      value: 'rating-desc',
      label: 'Rating Descending',
    },
  ];

  return (
    <div className={styles.sortByWrapper}>
      <Select
        value={[method]}
        onChange={handleSortChange}
        options={SortOptions}
        label={<SwapVertIcon color="inherit" />}
      />
    </div>
  );
};

export { Sort };
export type { SortByFilterProps, SortMethods, SortLabels };
