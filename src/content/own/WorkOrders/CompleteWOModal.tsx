import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Form from '../components/form';
import * as Yup from 'yup';
import { IField } from '../type';
import { useContext } from 'react';
import { CompanySettingsContext } from '../../../contexts/CompanySettingsContext';

interface SignatureProps {
  open: boolean;
  onClose: () => void;
  fieldsConfig: { feedback: boolean; signature: boolean };
  onComplete: (
    id: number | undefined,
    feedback: string
  ) => Promise<void | number | number[]>;
}
export default function CompleteWOModal({
  open,
  onClose,
  onComplete,
  fieldsConfig
}: SignatureProps) {
  const { t }: { t: any } = useTranslation();
  const { uploadFiles } = useContext(CompanySettingsContext);

  const getFieldsAndShape = (): [Array<IField>, { [key: string]: any }] => {
    let fields = [];
    let shape = {};
    if (fieldsConfig.feedback) {
      fields.push({
        name: 'feedback',
        type: 'text',
        label: t('Feedback'),
        placeholder: t('Give your feedback'),
        multiple: true
      });
      shape = { feedback: Yup.string().required(t('Feedback is required')) };
    }
    if (fieldsConfig.signature) {
      fields.push({
        name: 'signature',
        type: 'file',
        label: t('Signature'),
        fileType: 'image'
      });
      shape = {
        ...shape,
        signature: Yup.array().required(t('Image is required'))
      };
    }
    return [fields, shape];
  };
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          p: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('Close Work Order')}
        </Typography>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          p: 3
        }}
      >
        <Form
          fields={getFieldsAndShape()[0]}
          validation={Yup.object().shape(getFieldsAndShape()[1])}
          submitText={t('Close')}
          values={{}}
          onChange={({ field, e }) => {}}
          onSubmit={async (values) => {
            return new Promise<void>((resolve, rej) => {
              uploadFiles([], values.signature ?? [])
                .then((files) => {
                  onComplete(files[0]?.id, values?.feedback)
                    .then(onClose)
                    .finally(resolve);
                })
                .catch((err) => {
                  rej(err);
                });
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
