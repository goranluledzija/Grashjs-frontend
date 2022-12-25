import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AppThunk } from 'src/store';
import Labor from '../models/owns/labor';
import api from '../utils/api';

const basePath = 'additional-times';
interface LaborState {
  timesByWorkOrder: { [id: number]: Labor[] };
}

const initialState: LaborState = {
  timesByWorkOrder: {}
};

const slice = createSlice({
  name: 'labors',
  initialState,
  reducers: {
    getLabors(
      state: LaborState,
      action: PayloadAction<{ id: number; labors: Labor[] }>
    ) {
      const { labors, id } = action.payload;
      state.timesByWorkOrder[id] = labors;
    },
    createLabor(
      state: LaborState,
      action: PayloadAction<{
        workOrderId: number;
        labor: Labor;
      }>
    ) {
      const { labor, workOrderId } = action.payload;
      if (state.timesByWorkOrder[workOrderId]) {
        state.timesByWorkOrder[workOrderId].push(labor);
      } else state.timesByWorkOrder[workOrderId] = [labor];
    },
    editLabor(
      state: LaborState,
      action: PayloadAction<{
        id: number;
        workOrderId: number;
        labor: Labor;
      }>
    ) {
      const { labor, workOrderId, id } = action.payload;
      state.timesByWorkOrder[workOrderId] = state.timesByWorkOrder[
        workOrderId
      ].map((addTime) => {
        if (addTime.id === id) {
          return labor;
        }
        return addTime;
      });
    },
    deleteLabor(
      state: LaborState,
      action: PayloadAction<{
        workOrderId: number;
        id: number;
      }>
    ) {
      const { id, workOrderId } = action.payload;
      state.timesByWorkOrder[workOrderId] = state.timesByWorkOrder[
        workOrderId
      ].filter((labor) => labor.id !== id);
    },
    controlTimer(
      state: LaborState,
      action: PayloadAction<{
        workOrderId: number;
        labor: Labor;
      }>
    ) {
      const { labor, workOrderId } = action.payload;
      const filteredLabors = state.timesByWorkOrder[workOrderId].filter(
        (aT) => aT.id !== labor.id
      );
      filteredLabors.push(labor);
      state.timesByWorkOrder[workOrderId] = filteredLabors;
    }
  }
});

export const reducer = slice.reducer;

export const getLabors =
  (id: number): AppThunk =>
  async (dispatch) => {
    const labors = await api.get<Labor[]>(`${basePath}/work-order/${id}`);
    dispatch(slice.actions.getLabors({ id, labors }));
  };

export const createLabor =
  (id: number, labor: Partial<Labor>): AppThunk =>
  async (dispatch) => {
    const laborResponse = await api.post<Labor>(`${basePath}`, {
      ...labor,
      workOrder: { id }
    });
    dispatch(
      slice.actions.createLabor({
        workOrderId: id,
        labor: laborResponse
      })
    );
  };

export const editLabor =
  (id: number, workOrderId: number, labor: Labor): AppThunk =>
  async (dispatch) => {
    const laborResponse = await api.patch<Labor>(`${basePath}/${id}`, labor);
    dispatch(
      slice.actions.editLabor({
        workOrderId,
        id,
        labor: laborResponse
      })
    );
  };
export const deleteLabor =
  (workOrderId: number, id: number): AppThunk =>
  async (dispatch) => {
    const response = await api.deletes<{ success: boolean }>(
      `${basePath}/${id}`
    );
    const { success } = response;
    if (success) {
      dispatch(slice.actions.deleteLabor({ workOrderId, id }));
    }
  };

export const controlTimer =
  (start: boolean, id: number): AppThunk =>
  async (dispatch) => {
    const response = await api.post<Labor>(
      `${basePath}/work-order/${id}?start=${start}`,
      {}
    );
    dispatch(
      slice.actions.controlTimer({
        labor: response,
        workOrderId: id
      })
    );
  };

export default slice;
