import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {RawCountryInterface} from '@/store/countries/types';

export const {
  setStore: setCountryStore,
  actions: countryActions,
  useByKey: useCountry,
  useKeysByQuery: useCountryByQuery,
  getByKey: getCountryByKey,
  reducer: countryReducer,
  getKeysByQuery: getCountryByQuery,
  sync: syncCountry,
  setQueries: setCountryQueries,
} = createDynamicReducer<RawCountryInterface>('country', 'code');
//
const allCountriesByIds = (state: RootState) => state.country.query.all || [];

const allCountriesByKey = (state: RootState) => state.country.byKey;

const countriesSelectorFactory = createSelector(
  allCountriesByIds,
  allCountriesByKey,
  (byIds, byKey) => {
    return byIds
      .map(item => {
        return {
          value: byKey[item].code,
          label: byKey[item].name,
        };
      })
      .filter(Boolean);
  },
);

export const getAllCountries = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector(countriesSelectorFactory) || [];
};
