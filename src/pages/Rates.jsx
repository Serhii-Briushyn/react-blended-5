import { Wave } from 'react-animated-text';
import {
  Container,
  Filter,
  Heading,
  Loader,
  RatesList,
  Section,
} from 'components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  selectFilteredRates,
  selectIsError,
  selectIsLoading,
  selectRates,
} from 'reduxState/selectors';
import { fetchLatestRates } from 'reduxState/operations';

const Rates = () => {
  const isError = useSelector(selectIsError);
  const isLoader = useSelector(selectIsLoading);
  const baseCurrency = useSelector(selectBaseCurrency);
  const filteredRates = useSelector(selectFilteredRates);
  const rates = useSelector(selectRates);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestRates(baseCurrency));
  }, [baseCurrency, dispatch]);

  return (
    <Section>
      <Container>
        {isLoader && <Loader />}
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {rates.length > 0 && <Filter />}
        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
