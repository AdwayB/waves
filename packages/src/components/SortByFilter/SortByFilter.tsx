import { FC, useState } from 'react';
import styles from './sortByFilter.module.scss';
import { Select, SelectOptionProps } from '../Select';
import SwapVertIcon from '@mui/icons-material/SwapVert';

interface SortByFilterProps {
  onSortChange: (value: string) => void;
}

enum SortMethods {
  DATE_ASC = 'date-asc',
  NAME_ASC = 'name-asc',
  NAME_DESC = 'name-desc',
  ARTIST_ASC = 'artist-asc',
  ARTIST_DESC = 'artist-desc',
}

const SortByDropdown: FC<SortByFilterProps> = (props) => {
  const { onSortChange } = props;
  const [method, setMethod] = useState<SortMethods>(SortMethods.DATE_ASC);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortChange = (event: any) => {
    const newSort = event?.target.value as SortMethods;
    setMethod(newSort);
    onSortChange(newSort);
  };

  const SortOptions: SelectOptionProps[] = [
    {
      value: SortMethods.DATE_ASC,
      label: 'Date Ascending',
    },
    {
      value: SortMethods.NAME_ASC,
      label: 'Name Ascending',
    },
    {
      value: SortMethods.NAME_DESC,
      label: 'Name Descending',
    },
    {
      value: SortMethods.ARTIST_ASC,
      label: 'Artist Ascending',
    },
    {
      value: SortMethods.ARTIST_DESC,
      label: 'Artist Descending',
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

export { SortMethods, SortByDropdown };
export type { SortByFilterProps };
