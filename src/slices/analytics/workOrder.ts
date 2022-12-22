import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AppThunk } from 'src/store';
import api from '../../utils/api';
import {
  WoOverviewStats,
  WOStatsByPriority
} from '../../models/owns/analytics/workOrder';

const basePath = 'work-order-analytics';
interface WOStatstate {
  overview: WoOverviewStats;
  incompleteByPriority: WOStatsByPriority;
  loading: { overview: boolean; incompleteByPriority: boolean };
}
type Operation = keyof WOStatstate;

const initialState: WOStatstate = {
  overview: {
    total: 0,
    complete: 0,
    compliant: 0,
    avgCycleTime: 0
  },
  incompleteByPriority: {
    none: {
      count: 0,
      estimatedHours: 0
    },
    high: {
      count: 0,
      estimatedHours: 0
    },
    medium: {
      count: 0,
      estimatedHours: 0
    },
    low: {
      count: 0,
      estimatedHours: 0
    }
  },
  loading: { overview: false, incompleteByPriority: false }
};

const slice = createSlice({
  name: 'overviewStats',
  initialState,
  reducers: {
    getStats(
      state: WOStatstate,
      action: PayloadAction<{ overviewStats: WoOverviewStats }>
    ) {
      const { overviewStats } = action.payload;
      state.overview = overviewStats;
    },
    getIncompleteByPriority(
      state: WOStatstate,
      action: PayloadAction<{ stats: WOStatsByPriority }>
    ) {
      const { stats } = action.payload;
      state.incompleteByPriority = stats;
    },
    setLoadingGet(
      state: WOStatstate,
      action: PayloadAction<{ loading: boolean; operation: Operation }>
    ) {
      const { loading, operation } = action.payload;
      state.loading[operation] = loading;
    }
  }
});

export const reducer = slice.reducer;

export const getOverviewStats = (): AppThunk => async (dispatch) => {
  dispatch(
    slice.actions.setLoadingGet({ operation: 'overview', loading: true })
  );
  const overviewStats = await api.get<WoOverviewStats>(`${basePath}/overview`);
  dispatch(slice.actions.getStats({ overviewStats }));
  dispatch(
    slice.actions.setLoadingGet({ operation: 'overview', loading: false })
  );
};

export const getIncompleteByPriority = (): AppThunk => async (dispatch) => {
  dispatch(
    slice.actions.setLoadingGet({
      operation: 'incompleteByPriority',
      loading: true
    })
  );
  const stats = await api.get<WOStatsByPriority>(
    `${basePath}/incomplete-priority`
  );
  dispatch(slice.actions.getIncompleteByPriority({ stats }));
  dispatch(
    slice.actions.setLoadingGet({
      operation: 'incompleteByPriority',
      loading: false
    })
  );
};
export default slice;