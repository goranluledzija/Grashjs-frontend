import { Helmet } from 'react-helmet-async';
import { Button, Card, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IField } from '../type';
import { useContext, useEffect } from 'react';
import { TitleContext } from '../../../contexts/TitleContext';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { addPurchaseOrder } from '../../../slices/purchaseOrder';
import { useDispatch, useSelector } from '../../../store';
import Form from '../components/form';
import * as Yup from 'yup';
import { phoneRegExp } from '../../../utils/validators';
import { formatSelect } from '../../../utils/formatters';
import { useNavigate } from 'react-router-dom';

function CreatePurchaseOrder() {
  const { t }: { t: any } = useTranslation();
  const { setTitle } = useContext(TitleContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTitle(t('New Purchase Order'));
  }, []);

  const fields: Array<IField> = [
    {
      name: 'purchaseOrderDetails',
      type: 'titleGroupField',
      label: t('Purchase Order Details')
    },
    {
      name: 'name',
      type: 'text',
      label: t('Name'),
      placeholder: t('Enter Purchase Order name'),
      required: true,
      midWidth: true
    },
    {
      name: 'category',
      type: 'text',
      label: t('Category'),
      placeholder: t('Category'),
      midWidth: true
    },
    {
      name: 'shippingDueDate',
      type: 'date',
      label: t('Due Date'),
      midWidth: true
    },
    {
      name: 'shippingAdditionalDetail',
      type: 'text',
      label: t('Additional Details'),
      midWidth: true,
      multiple: true
    },
    {
      name: 'vendor',
      type: 'select',
      type2: 'vendor',
      label: t('Vendor'),
      midWidth: true
    },
    {
      name: 'parts',
      type: 'select',
      type2: 'part',
      label: t('Parts'),
      midWidth: true,
      multiple: true
    },
    {
      name: 'shippingInformation',
      type: 'titleGroupField',
      label: t('Shipping Information')
    },
    {
      name: 'shippingCompanyName',
      type: 'text',
      label: t('Company name'),
      placeholder: t('Company name'),
      midWidth: true
    },
    {
      name: 'shippingShipToName',
      type: 'text',
      label: t('Ship To'),
      placeholder: t('Ship To'),
      midWidth: true
    },
    {
      name: 'shippingAddress',
      type: 'text',
      label: t('Address'),
      placeholder: t('Address'),
      midWidth: true
    },
    {
      name: 'shippingCity',
      type: 'text',
      label: t('City'),
      placeholder: t('City'),
      midWidth: true
    },
    {
      name: 'shippingState',
      type: 'text',
      label: t('State'),
      placeholder: t('State'),
      midWidth: true
    },
    {
      name: 'shippingZipCode',
      type: 'number',
      label: t('Zip Code'),
      placeholder: t('Zip Code'),
      midWidth: true
    },
    {
      name: 'shippingPhone',
      type: 'text',
      label: t('Phone number'),
      placeholder: t('Phone number'),
      midWidth: true
    },
    {
      name: 'shippingFax',
      type: 'text',
      label: t('Fax Number'),
      placeholder: t('Fax Number'),
      midWidth: true
    },
    {
      name: 'additionalInformation',
      type: 'titleGroupField',
      label: t('Additional Information')
    },
    {
      name: 'additionalInfoDate',
      type: 'date',
      label: t('Purchase Order Date'),
      placeholder: t('Purchase Order Date'),
      midWidth: true
    },
    {
      name: 'additionalInfoNotes',
      type: 'text',
      label: t('Notes'),
      placeholder: t('Add Notes'),
      midWidth: true,
      multiple: true
    },
    {
      name: 'additionalInfoRequistionerName',
      type: 'text',
      label: t('Requisitioner'),
      placeholder: t('Requisitioner'),
      midWidth: true
    },
    {
      name: 'additionalInfoTerm',
      type: 'text',
      label: t('Terms'),
      placeholder: t('Terms'),
      midWidth: true
    },
    {
      name: 'additionalInfoShippingOrderCategory',
      type: 'text',
      label: t('Shipping Method'),
      placeholder: t('Shipping Method'),
      midWidth: true
    }
  ];
  const shape = {
    name: Yup.string().required(t('The name is required')),
    shippingFax: Yup.string().matches(
      phoneRegExp,
      t('The fax number is invalid')
    ),
    shippingPhone: Yup.string().matches(
      phoneRegExp,
      t('The phone number is invalid')
    )
  };
  return (
    <>
      <Helmet>
        <title>{t('Purchase Orders')}</title>
      </Helmet>
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
        paddingX={4}
      >
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          justifyContent="right"
          alignItems="center"
        >
          <Button
            startIcon={<AddTwoToneIcon />}
            sx={{ mx: 6, my: 1 }}
            variant="contained"
          >
            Submit and Approve
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Form
              fields={fields}
              validation={Yup.object().shape(shape)}
              submitText={t('Submit')}
              values={{}}
              onChange={({ field, e }) => {}}
              onSubmit={async (values) => {
                try {
                  //TODO category
                  delete values.category;
                  values.vendor = formatSelect(values.vendor);
                  dispatch(addPurchaseOrder(values));
                  navigate('/app/purchase-orders');
                } catch (err) {
                  console.error(err);
                }
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default CreatePurchaseOrder;
