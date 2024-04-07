import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import FileInput from '../ui/FileInput';
import Textarea from '../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useCreateItem } from '../hooks/useCreateItem';
import { useSubCategory } from '../hooks/useSubCategory';

function AddItem() {
  const { isCreating, createItem } = useCreateItem();
  const { isLoading, subCategories } = useSubCategory();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const isDisabled = isLoading || isCreating;

  const onSubmit = (data) => {
    console.log(data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    createItem(
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
          disabled={isDisabled}
          {...register('title', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Price' error={errors?.price?.message}>
        <Input
          type='number'
          id='price'
          disabled={isDisabled}
          {...register('price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
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

      <FormRow label='Veg' error={errors?.veg?.message}>
        <select {...register('veg', { required: 'This field is required' })}>
          <option value='veg'>veg</option>
          <option value='non-veg'>non-veg</option>
          <option value='egg'>egg</option>
          <option value='vegan'>vegan</option>
        </select>
      </FormRow>

      <FormRow label='Photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Category' error={errors?.category?.message}>
        <select
          {...register('category', { required: 'This field is required' })}
        >
          <option value='food'>food</option>
          <option value='drinks'>drinks</option>
          <option value='bakes'>bakes</option>
          <option value='specials'>specials</option>
        </select>
      </FormRow>

      <FormRow label='Bestseller' error={errors?.isBestSeller?.message}>
        <select
          {...register('isBestSeller', { required: 'This field is required' })}
        >
          <option value={true}>yes</option>
          <option value={false}>no</option>
        </select>
      </FormRow>

      <FormRow label='Sub Category' error={errors?.subCategory?.message}>
        <select
          {...register('subCategory', { required: 'This field is required' })}
        >
          {subCategories?.map((sub) => {
            return (
              <option value={sub.title} key={sub.id}>
                {' '}
                {sub.title}
              </option>
            );
          })}
        </select>
      </FormRow>

      <FormRow label='Pairs With 1' error={errors?.pairsWith1?.message}>
        <select
          {...register('pairsWith1', { required: 'This field is required' })}
        >
          {subCategories?.map((sub) => {
            return (
              <option value={sub.title} key={sub.id}>
                {' '}
                {sub.title}
              </option>
            );
          })}
        </select>
      </FormRow>

      <FormRow label='Pairs With 2' error={errors?.pairsWith2?.message}>
        <select
          {...register('pairsWith2', { required: 'This field is required' })}
        >
          {subCategories?.map((sub) => {
            return (
              <option value={sub.title} key={sub.id}>
                {' '}
                {sub.title}
              </option>
            );
          })}
        </select>
      </FormRow>

      <FormRow label='Add Ons' error={errors?.addOns?.message}>
        <Input
          type='text'
          id='addOns'
          disabled={isDisabled}
          {...register('addOns')}
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

export default AddItem;
