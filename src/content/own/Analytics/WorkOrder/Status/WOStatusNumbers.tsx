import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from '../../../../../store';
import AnalyticsCard from '../../AnalyticsCard';

function WOStatusNumbers() {
  const { t }: { t: any } = useTranslation();
  const { files, loadingGet } = useSelector((state) => state.files);

  const dispatch = useDispatch();
  const counts = {
    workOrdersCount: 1,
    completeWO: 2,
    compliant: 1,
    avgCycleTime: 10
  };

  const datas: { label: string; value: number }[] = [
    { label: t('Count'), value: counts.workOrdersCount },
    { label: t('Complete'), value: counts.completeWO },
    { label: t('Compliant'), value: counts.compliant },
    { label: t('Average Cycle Time (Days)'), value: counts.avgCycleTime }
  ];
  return (
    <AnalyticsCard
      title="The numbers"
      height={200}
      description="Compliant work orders are defined as work orders that were completed before the due date. Cycle time refers to the number of days until a work order was completed."
    >
      <Stack sx={{ height: '100%', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2}>
          {datas.map((data) => (
            <Stack key={data.label} alignItems="center">
              <Typography
                variant="h2"
                fontWeight="bold"
                style={{ cursor: 'pointer' }}
              >
                {data.value}
              </Typography>
              <Typography>{data.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </AnalyticsCard>
  );
}

export default WOStatusNumbers;