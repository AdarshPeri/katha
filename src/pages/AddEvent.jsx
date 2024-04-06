import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import FileInput from '../ui/FileInput';
import Textarea from '../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useCreateEvent } from '../hooks/useCreateEvent';

function AddEvent() {
  const { isCreating, createEvent } = useCreateEvent();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const isDisabled = isCreating;

  const onSubmit = (data) => {
    console.log(data);
    const previewImage = typeof data.previewImage === 'string' ? data.previewImage : data.previewImage[0];
    const fullImage = typeof data.fullImage === 'string' ? data.fullImage : data.fullImage[0];

    createEvent(
      { ...data, previewImage, fullImage },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type='regular'>
      <FormRow label='Title' error={errors?.title?.message}>
        <Input
          type='text'
          id='title'
          disabled={isDisabled}
          {...register('title', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isDisabled}
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Preview Image'>
        <FileInput
          id='previewImage'
          accept='image/*'
          {...register('previewImage', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Full Image'>
        <FileInput
          id='fullImage'
          accept='image/*'
          {...register('fullImage', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Preview Date' error={errors?.previewDate?.message}>
        <Input
          type='text'
          id='previewDate'
          disabled={isDisabled}
          {...register('previewDate', {
            required: 'This field is required',
          })}
          placeholder='30/03'
        />
      </FormRow>

      <FormRow label='Full Date' error={errors?.fullDate?.message}>
        <Input
          type='text'
          id='fullDate'
          disabled={isDisabled}
          {...register('fullDate', {
            required: 'This field is required',
          })}
          placeholder='Friday, March 15th - 12PM to 6PM'
        />
      </FormRow>

      <FormRow label='RSVP link' error={errors?.rsvp?.message}>
        <Input
          type='text'
          id='rsvp'
          disabled={isDisabled}
          {...register('rsvp', {
            required: 'This field is required',
          })}
        />
      </FormRow>


      <FormRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isDisabled}>{'Create Item'}</Button>
      </FormRow>
    </Form>
  );
}

export default AddEvent;
