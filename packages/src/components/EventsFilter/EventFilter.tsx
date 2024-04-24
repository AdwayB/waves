import { FC, useEffect, useState } from 'react';
import styles from './eventsFilter.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '../DatePicker';
import { Select, SelectOptionProps } from '../Select';
import { Slider, SliderMarks } from '../Slider';

interface FilterTypes {
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  distance?: number;
  genres?: string[];
}

interface EventFilterProps {
  onFilterChange: (filters: FilterTypes) => void;
  genres: string[];
  className?: string;
}

const EventFilter: FC<EventFilterProps> = (props) => {
  const { onFilterChange, genres, className } = props;
  const [genreArray, setGenreArray] = useState<string[]>(genres ?? []);
  const [genreOptions, setGenreOptions] = useState<SelectOptionProps[]>([]);
  const [filters, setFilters] = useState<FilterTypes>({});
  const [startDateError, setStartDateError] = useState<boolean>(false);
  const [endDateError, setEndDateError] = useState<boolean>(false);

  useEffect(() => {
    if (filters.startDate && filters.endDate) {
      if (filters.startDate.isAfter(filters.endDate)) {
        setEndDateError(true);
      } else if (filters.endDate.isBefore(filters.startDate)) {
        setStartDateError(true);
      } else {
        setStartDateError(false);
        setEndDateError(false);
      }
    } else {
      setStartDateError(false);
      setEndDateError(false);
    }
  }, [filters.startDate, filters.endDate]);

  useEffect(() => {
    setGenreOptions(
      genres.map((genre) => ({
        label: genre,
        value: `${genre.toLowerCase()}-genre`,
      })),
    );
  }, [genres]);

  const handleDateChange = (value: Dayjs, type: 'startDate' | 'endDate') => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleDistanceChange = (e: Event, value: number | number[]) => {
    setFilters((prev) => ({ ...prev, distance: value as number }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGenresChange = (e: any) => {
    setGenreArray(e.target.value);
    setFilters((prev) => ({ ...prev, genres: e.target.value }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const sliderMarks: SliderMarks[] = [
    { value: 0, label: '' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
    { value: 50, label: '50' },
    { value: 60, label: '60' },
    { value: 70, label: '70' },
    { value: 80, label: '80' },
    { value: 90, label: '90' },
    { value: 100, label: '100' },
    { value: 200, label: '200' },
    { value: 300, label: '300' },
    { value: 400, label: '400' },
    { value: 500, label: '500' },
  ];

  return (
    <div className={`${styles.eventFilterContainer} ${className}`}>
      <DatePicker
        label="Pick Start Date"
        value={filters.startDate}
        onChange={(value) => handleDateChange(value, 'startDate')}
        disablePast
        error={startDateError}
        className={styles.datePicker}
      />
      <DatePicker
        label="Pick End Date"
        value={filters.endDate}
        onChange={(value) => handleDateChange(value, 'endDate')}
        error={endDateError}
        minDate={filters.startDate ?? dayjs()}
        className={styles.datePicker}
      />
      <Slider
        label="Pick Distance (KM)"
        value={filters.distance ?? 0}
        onChange={handleDistanceChange}
        marks={sliderMarks}
        min={0}
        max={100}
        steps={null}
        className={styles.slider}
      />
      <div className={styles.selectWrapper}>
        <Select
          label="Select Genres"
          value={genreArray}
          onChange={handleGenresChange}
          style="chip"
          options={genreOptions}
          multiple
        />
      </div>
    </div>
  );
};

export { EventFilter };
export type { FilterTypes, EventFilterProps };
