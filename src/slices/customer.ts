import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AppThunk } from 'src/store';
import { Customer, CustomerMiniDTO } from '../models/owns/customer';
import api from '../utils/api';

interface CustomerState {
  customers: Customer[];
  customersMini: CustomerMiniDTO[];
  loadingGet: boolean;
}

const initialState: CustomerState = {
  customers: [],
  customersMini: [],
  loadingGet: false
};

const slice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    getCustomers(
      state: CustomerState,
      action: PayloadAction<{ customers: Customer[] }>
    ) {
      const { customers } = action.payload;
      state.customers = customers;
    },
    getCustomersMini(
      state: CustomerState,
      action: PayloadAction<{ customers: CustomerMiniDTO[] }>
    ) {
      const { customers } = action.payload;
      state.customersMini = customers;
    },
    addCustomer(
      state: CustomerState,
      action: PayloadAction<{ customer: Customer }>
    ) {
      const { customer } = action.payload;
      state.customers = [...state.customers, customer];
    },
    editCustomer(
      state: CustomerState,
      action: PayloadAction<{ customer: Customer }>
    ) {
      const { customer } = action.payload;
      state.customers = state.customers.map((customer1) => {
        if (customer1.id === customer.id) {
          return customer;
        }
        return customer1;
      });
    },
    deleteCustomer(
      state: CustomerState,
      action: PayloadAction<{ id: number }>
    ) {
      const { id } = action.payload;
      const customerIndex = state.customers.findIndex(
        (customer) => customer.id === id
      );
      state.customers.splice(customerIndex, 1);
    },
    setLoadingGet(
      state: CustomerState,
      action: PayloadAction<{ loading: boolean }>
    ) {
      const { loading } = action.payload;
      state.loadingGet = loading;
    }
  }
});

export const reducer = slice.reducer;

export const getCustomers = (): AppThunk => async (dispatch) => {
  dispatch(slice.actions.setLoadingGet({ loading: true }));
  const customers = await api.get<Customer[]>('customers');
  dispatch(slice.actions.getCustomers({ customers }));
  dispatch(slice.actions.setLoadingGet({ loading: false }));
};
export const getCustomersMini = (): AppThunk => async (dispatch) => {
  const customers = await api.get<CustomerMiniDTO[]>('customers/mini');
  dispatch(slice.actions.getCustomersMini({ customers }));
};
export const addCustomer =
  (customer): AppThunk =>
  async (dispatch) => {
    const customerResponse = await api.post<Customer>('customers', customer);
    dispatch(slice.actions.addCustomer({ customer: customerResponse }));
  };
export const editCustomer =
  (id: number, customer): AppThunk =>
  async (dispatch) => {
    const customerResponse = await api.patch<Customer>(
      `customers/${id}`,
      customer
    );
    dispatch(slice.actions.editCustomer({ customer: customerResponse }));
  };
export const deleteCustomer =
  (id: number): AppThunk =>
  async (dispatch) => {
    const customerResponse = await api.deletes<{ success: boolean }>(
      `customers/${id}`
    );
    const { success } = customerResponse;
    if (success) {
      dispatch(slice.actions.deleteCustomer({ id }));
    }
  };

export default slice;
