import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import FileInput from '../ui/FileInput';
import { useForm } from 'react-hook-form';
import { useCreateSub } from '../hooks/useCreateSub';

function AddSubCategory() {
  const { isCreating, createSubCateg } = useCreateSub();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    createSubCateg(
      { ...data, image },
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
          disabled={isCreating}
          {...register('title', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Hex' error={errors?.hex?.message}>
        <Input
          type='text'
          id='hex'
          disabled={isCreating}
          {...register('hex', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Image'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Category' error={errors?.category?.message}>
      <select {...register('category', { required: 'This field is required' })}>
          <option value='food'>food</option>
          <option value='drinks'>drinks</option>
          <option value='bakes'>bakes</option>
          <option value='specials'>specials</option>
        </select>
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>{'Create Item'}</Button>
      </FormRow>
    </Form>
  );
}

export default AddSubCategory;
