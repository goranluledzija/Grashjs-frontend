import {
  Box,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomDataGrid from '../components/CustomDatagrid';
import {
  GridActionsCellItem,
  GridRenderCellParams,
  GridRowParams,
  GridToolbar
} from '@mui/x-data-grid';
import { GridEnrichedColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Part, { parts } from '../../../models/owns/part';
import { ChangeEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import Form from '../components/form';
import wait from '../../../utils/wait';
import { IField } from '../type';

interface PropsType {
  setAction: (p: () => () => void) => void;
}

const Parts = ({ setAction }: PropsType) => {
  const { t }: { t: any } = useTranslation();
  const [currentTab, setCurrentTab] = useState<string>('list');
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const tabs = [
    { value: 'list', label: t('List View') },
    { value: 'card', label: t('Card View') }
  ];
  const theme = useTheme();

  useEffect(() => {
    const handleOpenModal = () => setOpenAddModal(true);
    setAction(() => handleOpenModal);
  }, []);

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  const columns: GridEnrichedColDef[] = [
    {
      field: 'name',
      headerName: t('Name'),
      description: t('Name'),
      width: 150,
      renderCell: (params: GridRenderCellParams<string>) => (
        <Box sx={{ fontWeight: 'bold' }}>{params.value}</Box>
      )
    },
    {
      field: 'cost',
      headerName: t('Cost'),
      description: t('Cost'),
      width: 150
    },
    {
      field: 'quantity',
      headerName: t('Quantity'),
      description: t('Quantity'),
      width: 150
    },
    {
      field: 'barCode',
      headerName: t('Barcode'),
      description: t('Barcode'),
      width: 150
    },
    {
      field: 'area',
      headerName: t('Area'),
      description: t('Area'),
      width: 150
    },
    {
      field: 'category',
      headerName: t('Category'),
      description: t('Category'),
      width: 150
    },
    {
      field: 'description',
      headerName: t('Description'),
      description: t('Description'),
      width: 150
    },
    {
      field: 'location',
      headerName: t('Location'),
      description: t('Location'),
      width: 150
    },
    {
      field: 'users',
      headerName: t('Assigned Users'),
      description: t('Assigned Users'),
      width: 150
    },
    {
      field: 'vendors',
      headerName: t('Assigned Vendors'),
      description: t('Assigned Vendors'),
      width: 150
    },
    {
      field: 'createdAt',
      headerName: t('Date Created'),
      description: t('Date Created'),
      width: 150
    },
    {
      field: 'openWorkOrders',
      headerName: t('Open Work Orders'),
      description: t('Open Work Orders'),
      width: 150
    }
  ];
  const fields: Array<IField> = [
    {
      name: 'name',
      type: 'text',
      label: t('Name'),
      placeholder: t('Enter Part name'),
      required: true
    },
    {
      name: 'description',
      type: 'text',
      label: t('Description'),
      placeholder: t('Description'),
      multiple: true
    },
    {
      name: 'category',
      type: 'text',
      label: t('Category'),
      placeholder: t('Enter Part category')
    },
    {
      name: 'cost',
      type: 'number',
      label: t('Cost'),
      placeholder: t('Enter Part cost')
    },
    {
      name: 'quantity',
      type: 'number',
      label: t('Quantity'),
      placeholder: t('Enter Part quantity')
    },
    {
      name: 'minQuantity',
      type: 'number',
      label: t('Minimum Quantity'),
      placeholder: t('Enter Part minimum quantity')
    },
    {
      name: 'nonStock',
      type: 'checkbox',
      label: t('Non Stock')
    },
    {
      name: 'barcode',
      type: 'text',
      label: t('Barcode'),
      placeholder: t('Enter Part Barcode')
    },
    {
      name: 'area',
      type: 'text',
      label: t('Area'),
      placeholder: t('Enter Part Area')
    },
    {
      name: 'additionalInfos',
      type: 'text',
      label: t('Additional Part Details'),
      placeholder: t('Additional Part Details'),
      multiple: true
    },
    {
      name: 'workers',
      type: 'select',
      type2: 'user',
      multiple: true,
      label: t('Workers'),
      placeholder: 'Select Workers'
    },
    {
      name: 'teams',
      type: 'select',
      type2: 'team',
      multiple: true,
      label: t('Teams'),
      placeholder: 'Select Teams'
    },
    {
      name: 'vendors',
      type: 'select',
      type2: 'vendor',
      multiple: true,
      label: t('Vendors'),
      placeholder: 'Select Vendors'
    },
    {
      name: 'customers',
      type: 'select',
      type2: 'customer',
      multiple: true,
      label: t('Customers'),
      placeholder: 'Select Customers'
    },
    {
      name: 'image',
      type: 'file',
      label: t('Image'),
      fileType: 'image'
    },
    {
      name: 'files',
      type: 'file',
      label: t('Files')
    }
  ];
  const shape = {
    name: Yup.string().required(t('Part name is required'))
  };
  const renderPartAddModal = () => (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openAddModal}
      onClose={() => setOpenAddModal(false)}
    >
      <DialogTitle
        sx={{
          p: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('Add Part')}
        </Typography>
        <Typography variant="subtitle2">
          {t('Fill in the fields below to create and add a new Part')}
        </Typography>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          p: 3
        }}
      >
        <Box>
          <Form
            fields={fields}
            validation={Yup.object().shape(shape)}
            submitText={t('Create Part')}
            values={{}}
            onChange={({ field, e }) => {}}
            onSubmit={async (values) => {
              try {
                await wait(2000);
              } catch (err) {
                console.error(err);
              }
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
  const renderField = (label, value) => {
    return (
      <Grid item xs={12}>
        <Stack spacing={1} direction="row">
          <Typography variant="h6" sx={{ color: theme.colors.alpha.black[70] }}>
            {label}
          </Typography>
          <Typography variant="h6">{value}</Typography>
        </Stack>
      </Grid>
    );
  };
  const fieldsToRender = (part: Part) => [
    {
      label: t('ID'),
      value: part.id
    },
    {
      label: t('Category'),
      value: part.category
    },
    {
      label: t('Quantity'),
      value: part.quantity
    },
    {
      label: t('Cost'),
      value: part.cost
    },
    {
      label: t('Barcode'),
      value: part.barCode
    },
    {
      label: t('Date created'),
      value: part.createdAt
    }
  ];
  return (
    <Box sx={{ p: 2 }}>
      {renderPartAddModal()}
      <Tabs
        sx={{ mb: 2 }}
        onChange={handleTabsChange}
        value={currentTab}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      {currentTab === 'list' && (
        <Box sx={{ height: 500, width: '95%' }}>
          <CustomDataGrid
            columns={columns}
            rows={parts}
            components={{
              Toolbar: GridToolbar
            }}
            initialState={{
              columns: {
                columnVisibilityModel: {}
              }
            }}
          />
        </Box>
      )}
      {currentTab === 'card' && (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {parts.map((part) => (
              <Grid item xs={12} lg={3} key={part.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="280"
                    image="/static/images/placeholders/covers/2.jpg"
                    alt="..."
                  />
                </Card>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h4">{part.name}</Typography>
                  <Box sx={{ mt: 1 }}>
                    {fieldsToRender(part).map((field) =>
                      renderField(field.label, field.value)
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Parts;