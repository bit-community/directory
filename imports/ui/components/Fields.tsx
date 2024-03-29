/**
 * This File will house the Form Fields that would be re-used across the project
 * This will be the Formik Fields Hook that extends formik functionality into chakra form fields
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Downshift from 'downshift'
import { useField, Form, Field, FieldProps } from 'formik'
import {
  FormControl,
  List,
  Textarea,
  ListItem,
  Checkbox,
  FormLabel,
  Select,
  RadioGroup,
  RadioButtonGroup,
  IconButton,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  Radio,
  InputRightElement,
  CheckboxGroup,
} from '@chakra-ui/core'
import * as Analytics from '/imports/ui/analytics'
//@ts-ignore
import FileInputComponent from 'react-file-input-previews-base64'
import CreatableSelect from 'react-select/creatable'

const FormikButton = styled(Button)<{ withIcon: boolean | undefined }>`
  border-radius: 1px;
  min-height: 56px;
  justify-content: ${(props) => (props.withIcon ? 'space-between' : 'center')};
  align-content: center;
`

const FormikTextArea = styled(Textarea)`
  border-radius: 1px;
  font-size: ${(props: any) => props.theme.custom.inputFontSize};
  border-bottom: 1.4px solid #979797;

  ::placeholder,
  ::-moz-placeholder {
    font-size: ${(props: any) => props.theme.custom.inputPlaceHolder};
    /* vertical-align: middle; */
  }
`

const FormikInput = styled(Input)`
  border-width: 1.1px;
  border-radius: 1px;
  /* padding-top: 2rem; */
  /* padding-bottom: 1.3rem; */
  font-size: ${(props: any) => props.theme.custom.inputFontSize};
  /* border-top: none; */
  /* border-right: none; */
  /* border-left: none; */

  ::placeholder,
  ::-moz-placeholder {
    font-size: ${(props: any) => props.theme.custom.inputPlaceHolder};
    vertical-align: middle;
  }
`
const FormikSelect = styled(Select)`
  border-radius: 1px;
  border-width: 1.1px;
  border: 1.1px solid;
  height: 55px;
  font-size: ${(props: any) => props.theme.custom.inputFontSize};
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: ${(props: any) => props.theme.custom.inputPlaceHolder};
  }
`
const FormikLabel = styled(FormLabel)<{ fsize?: string }>`
  font-size: ${(props) => (props.fsize ? props.fsize : '11px')};
  /* position: absolute; */
  top: 0;
  transition: ease-in 0.2s;
  z-index: 11111;
  /* padding: .1rem; */
  /* padding-left: 1rem; */
  /* padding-right: 10px; */
`

/**
 * This component extends a chakra input field and ties it up with the formik utility while exposing a few props to utilize across other pages
 * The form takes in a form name and calls a validation function that will be used within the pages
 */

interface TextAreaFieldProps {
  name: string
  placeholder: string
  label: string
  validate?: Function
}

const TextAreaField = (props: TextAreaFieldProps): JSX.Element => {
  const { validate, placeholder, name, label } = props

  return (
    <Field name={name} validate={validate} {...props}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={form.errors[name] && form.touched[name] ? true : false}
          mt="5"
          position="relative"
        >
          <FormikLabel
            fsize="14px"
            id={[name, 'label'].join('-')}
            htmlFor={[name, 'input'].join('-')}
            color="gray.600"
          >
            {label}
          </FormikLabel>
          <FormikTextArea
            isFullWidth
            variant="filled"
            {...field}
            id={[name, 'input'].join('-')}
            placeholder={placeholder}
            focusBorderColor="blue.700"
            borderColor="blue.700"
            errorBorderColor="red.500"
            size="lg"
          />

          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

TextAreaField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  validate: PropTypes.func,
}

interface InputFieldProps {
  name: string
  label: string
  placeholder: string
  type?: string
  validate?: Function
  trackInput?: Function
}

const InputField = (props: InputFieldProps): JSX.Element => {
  const { validate, type, name, placeholder, trackInput, label } = props

  /**
     * Formik Field Props to be aware of
     *  field, { name, value, onChange, onBlur }
        form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta => uses action handlers like touched... to trigger validation and other login on the Fields component
     */

  return (
    <Field name={name} validate={validate} {...props}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={form.errors[name] && form.touched[name] ? true : false}
          mt="3"
          position="relative"
        >
          <FormikLabel id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')} color="gray.600">
            {label}
          </FormikLabel>
          <InputGroup size="lg">
            <FormikInput
              trackInput={trackInput && trackInput(field.value)}
              {...props}
              type={type || 'text'}
              isFullWidth
              variant="outline"
              {...field}
              id={[name, 'input'].join('-')}
              placeholder={placeholder}
              focusBorderColor="blue.800"
              borderColor="blue.800"
              errorBorderColor="red.500"
              size="lg"
            />
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  validate: PropTypes.func,
}

// ++ ============================================= END SECTION =====================================================

/**
 * Extend the Form Component to Manage the Analytics provider, expose a Button component and HandleSubmit Action
 */

interface IFormikForm {
  analyticName: string
  children: any
  isLoading: boolean
  buttonName: string
  withIcon?: boolean | undefined
  formProps: {
    errors: object
    values: object
    [key: string]: any
  }
}

const FormikForm = (props: IFormikForm): JSX.Element => {
  const {
    children,
    withIcon,
    buttonName,
    isLoading,
    formProps: { errors, values },
    analyticName,
    ...rest
  } = props
  // console.log("HERE ARE FORMIK FORM ON SUBMISSION", props.formProps);

  // Call Analytics on all Form Submissions
  Analytics.track(analyticName, {
    errors: errors,
    value: values,
  })

  return (
    <Form {...rest}>
      {children}
      <FormikButton
        mt={10}
        withIcon={withIcon}
        variantColor="pink"
        variant="outline"
        type="submit"
        isLoading={isLoading}
        //@ts-ignore
        rightIcon={withIcon && 'arrow-forward'}
        width="100%"
        {...rest}
      >
        {buttonName}
      </FormikButton>
    </Form>
  )
}

FormikForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  analyticName: PropTypes.string,
  isLoading: PropTypes.bool,
  buttonName: PropTypes.string.isRequired,
  formProps: PropTypes.object,
}
// ++ ================================= END SECTION =================================================================++

/**
 * Formik Field for Password Inputs
 */
const PasswordField = (props: InputFieldProps): JSX.Element => {
  const { validate, name, placeholder, label } = props
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Field name={name} validate={validate} {...props}>
      {({ field, form }: FieldProps) => (
        //@ts-ignore
        <FormControl isInvalid={form.errors[name] && form.touched[name]} mt="3" position="relative">
          <FormikLabel htmlFor={name} color="gray.600">
            {label}
          </FormikLabel>
          <InputGroup size="lg">
            <FormikInput
              type={show ? 'text' : 'password'}
              isFullWidth
              variant="filled"
              {...field}
              id={name}
              placeholder={placeholder}
              focusBorderColor="blue.700"
              borderColor="blue.700"
              errorBorderColor="red.500"
              size="lg"
            />
            <InputRightElement width="4.5rem" pt="1">
              <IconButton
                variant="outline"
                size="sm"
                isRound
                aria-label="Reveal Password"
                icon={show ? 'view' : 'view-off'}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  validate: PropTypes.func,
}

// ++ ================================= END SECTION =================================================================++

/**
 * Formik Field for Radio Selections
 */

interface RadioFieldProps {
  validate: Function
  name: string
  label: string
  defaultValue?: string
  options: Array<string>
}

const RadioField = (props: RadioFieldProps): JSX.Element => {
  const { validate, name, defaultValue, options, label } = props

  return (
    <Field name={name} validate={validate} {...props}>
      {({ field, form }: FieldProps) => (
        //@ts-ignore
        <FormControl isInvalid={form.errors[name] && form.touched[name]} mt="5" position="relative">
          <FormLabel htmlFor={name} color="gray.600">
            {label}
          </FormLabel>
          <RadioGroup name={name} id={name} defaultValue={defaultValue} {...field} size="lg">
            {options &&
              options.map((val, idx) => {
                return (
                  <Radio key={`${val}-${idx}`} value={val.toLowerCase()}>
                    {val}
                  </Radio>
                )
              })}
          </RadioGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

RadioField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.func,
  defaultValue: PropTypes.string,
  options: PropTypes.array.isRequired,
}

interface ICustomRadio {
  isChecked: boolean
  isDisabled: boolean
  name: string
  value: string
  children: any
  [key: string]: any
}

const ButtonComponent = React.forwardRef((props: ICustomRadio, ref) => {
  // Step 1: Create a component that accepts `isChecked` and `isDisabled` prop
  const { isChecked, children, isDisabled, value, ...rest } = props
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? 'red' : 'blue'}
      aria-checked={isChecked}
      width="inherit"
      borderRadius="0"
      m="1"
      ml="0"
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    >
      {children}
    </Button>
  )
})

const RadioButtonField = (props: RadioFieldProps): JSX.Element => {
  const { validate, name, defaultValue, options, label, ...rest } = props
  //@ts-ignore
  const [field, meta, helpers] = useField(props)
  // console.log(field, meta, helpers);

  // directly call meta in place of meta.touched to show all errors ::: FIX ISSUE with component not displaying error onDirty
  return (
    <FormControl isInvalid={meta['error'] && meta.touched} mt="5" position="relative">
      <FormLabel {...field} htmlFor={[name, 'radio-button'].join('__')} color="gray.600">
        {label}
      </FormLabel>
      <RadioButtonGroup
        name={name}
        id={[name, 'radio-button'].join('__')}
        onChange={(val) => helpers.setTouched(true) && helpers.setValue(val)}
        defaultValue={'org'}
        isInline
        {...rest}
      >
        {options &&
          options.map((val, idx) => {
            return (
              <ButtonComponent name={val} key={[val, idx].join('--')} value={val} {...rest}>
                {val}
              </ButtonComponent>
            )
          })}
      </RadioButtonGroup>
      <FormErrorMessage>{meta.error && meta.error}</FormErrorMessage>
    </FormControl>
  )
}

RadioButtonField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.func,
  defaultValue: PropTypes.string,
  options: PropTypes.array.isRequired,
}

// ++ ================================= END SECTION =================================================================++

const CheckButtonField = (props: RadioFieldProps): JSX.Element => {
  const { validate, name, defaultValue, options, label, ...rest } = props
  //@ts-ignore
  const [field, meta, helpers] = useField(props)
  // console.log(field, meta, helpers);

  // directly call meta in place of meta.touched to show all errors ::: FIX ISSUE with component not displaying error onDirty
  return (
    <FormControl isInvalid={meta['error'] && meta.touched} mt="5" position="relative">
      <FormLabel {...field} htmlFor={[name, 'radio-button'].join('__')} color="gray.600">
        {label}
      </FormLabel>
      <CheckboxGroup name={name} onChange={(val) => helpers.setTouched(true) && helpers.setValue(val)}>
        {options &&
          options.map((val, idx) => {
            return (
              <ButtonComponent
                id={[name, 'check-button'].join('__')}
                isInline
                {...rest}
                name={val}
                key={[val, idx].join('--')}
                value={val}
                {...rest}
              >
                {val}
              </ButtonComponent>
            )
          })}
      </CheckboxGroup>
      <FormErrorMessage>{meta.error && meta.error}</FormErrorMessage>
    </FormControl>
  )
}

/**
 * Formik Field for Checkbox Selections
 */

interface CheckFieldProps {
  name: string
  boxLabel: string
  validate?: Function
  label?: string
  isChecked?: boolean
}

const CheckField = (props: CheckFieldProps): JSX.Element => {
  const { validate, boxLabel, isChecked, name, label } = props
  return (
    <Field name={name} validate={validate} {...props}>
      {({ field, form }: FieldProps) => (
        //@ts-ignore
        <FormControl isInvalid={form.errors[name] && form.touched[name]} mt="5" position="relative">
          {label && (
            <FormLabel id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')} color="gray.600">
              {label}
            </FormLabel>
          )}
          <Checkbox
            isChecked={isChecked}
            id={[name, 'input'].join('-')}
            size="lg"
            name={name}
            variantColor="blue"
            {...field}
          >
            {boxLabel}
          </Checkbox>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

CheckField.propTypes = {
  name: PropTypes.string.isRequired,
  boxLabel: PropTypes.string.isRequired,
  label: PropTypes.string,
  validate: PropTypes.func,
  isChecked: PropTypes.bool,
}

// ++ ================================= END SECTION =================================================================++

/**
 * Formik Field for Select options
 */

interface SelectFieldProps {
  validate: Function
  name: string
  label?: string
  mt?: string
  placeholder?: string
  defaultValue?: string
  options: Array<string>
}

const SelectField = (props: SelectFieldProps): JSX.Element => {
  const { validate, placeholder, name, mt, defaultValue, options, label } = props

  return (
    <Field name={name} validate={validate} {...props}>
      {({ field, form }: FieldProps) => (
        //@ts-ignore
        <FormControl
          isInvalid={form.errors[name] && form.touched[name]}
          mt={mt || '3'}
          position="relative"
          {...props}
        >
          {label && (
            <FormikLabel htmlFor={[name, 'select'].join('-')} color="gray.600">
              {label}
            </FormikLabel>
          )}
          <FormikSelect
            variant="filled"
            placeholder={placeholder}
            name={name}
            id={[name, 'select'].join('-')}
            defaultValue={defaultValue}
            {...field}
            size="lg"
          >
            {options &&
              options.map((val, idx) => {
                return (
                  <option key={`${val}-${idx}`} value={val.toLowerCase()}>
                    {val}
                  </option>
                )
              })}
          </FormikSelect>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validate: PropTypes.func,
  defaultValue: PropTypes.string,
  options: PropTypes.array.isRequired,
}

// ++ ================================= END SECTION =================================================================++

/**
 * Multi select with React Select
 */
interface IMutliSelectProps {
  validate: Function
  name: string
  label?: string
  mt?: string
  placeholder?: string
  defaultValue?: string
  options: Array<{ value: string; label: string }>
}

const MultiSelect = (props: IMutliSelectProps): JSX.Element => {
  const { name, label, options, validate, placeholder } = props

  return (
    <Field name={name} validate={validate} {...props}>
      {({ form }: FieldProps) => {
        return (
          <>
            {label && (
              <FormikLabel htmlFor={[name, 'select'].join('-')} color="gray.600">
                {label}
              </FormikLabel>
            )}
            <CreatableSelect
              name={name}
              isMulti
              onChange={(newValue: any) => {
                form.setFieldValue('skills', newValue)
              }}
              options={options}
              placeholder={placeholder}
              styles={customStyles}
            />
          </>
        )
      }}
    </Field>
  )
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: '#153e75',
    height: '3rem',
    borderRadius: 'none',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: 'A0AFC0',
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none',
  }),
}

/**
 * Formik Field for Autcomplete with DropShift options
 * https://dev.to/aromanarguello/how-to-build-an-autocomplete-dropdown-in-react-using-downshift-1c3o
 */

interface AutoCompleteProps {
  validate: Function
  name: string
  label?: string
  placeholder: string
  options: Array<{ value: string }>
  [key: string]: any
}

const AutoCompleteField = (props: AutoCompleteProps): JSX.Element => {
  const { validate, placeholder, name, options, label, ...rest } = props
  const [field, meta, helpers] = useField(props)

  // const items = ;

  return (
    <FormControl isInvalid={meta['error'] && meta.touched} mt="5" position="relative">
      <Downshift
        onChange={(selection) =>
          //pass in the full object of the field into form hooks
          helpers.setTouched(true) && helpers.setValue(selection)
        }
        itemToString={(item) => (item ? item.value : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getToggleButtonProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => (
          <div>
            <FormikLabel {...getToggleButtonProps()} {...getLabelProps()} color="gray.600">
              {label}
            </FormikLabel>
            <div {...getRootProps({}, { suppressRefError: true })}>
              <FormikInput
                isFullWidth
                variant="filled"
                {...field}
                placeholder={placeholder}
                {...getInputProps()}
                {...rest}
                validate={validate}
                focusBorderColor="blue.700"
                borderColor="blue.700"
                errorBorderColor="red.500"
                size="lg"
              />
            </div>

            <List {...getMenuProps()}>
              {isOpen
                ? options
                    .filter((item) => !inputValue || item.value.includes(inputValue))
                    .map((item, index) => (
                      <ListItem
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        {item.value}
                      </ListItem>
                    ))
                : null}
            </List>
          </div>
        )}
      </Downshift>
      <FormErrorMessage>{meta.error && meta.error}</FormErrorMessage>
    </FormControl>
  )
}

AutoCompleteField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validate: PropTypes.func,
  options: PropTypes.array.isRequired,
}

interface UploadFileProps {
  name: string
  type: string
  size: number
  base64: string
  file: Record<any, string>
}

interface FileInputProps {
  name: string
  label: string
  validate?: () => void
}
// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript Make this component better
export const SingleFileInputField = (props: FileInputProps): JSX.Element => {
  const { validate, name, label, ...rest } = props
  //@ts-ignore
  const [field, meta, helpers] = useField(props)
  // console.log(field, meta, helpers);

  // directly call meta in place of meta.touched to show all errors ::: FIX ISSUE with component not displaying error onDirty
  return (
    <FormControl isInvalid={(meta['error'] && meta.touched) || false} mt="5" position="relative">
      {/* <FormLabel htmlFor={[name, 'radio-button'].join('__')} color="bluee.700">{label}</FormLabel> */}

      <FileInputComponent
        labelText={label}
        id={[name, 'file-upload'].join('__')}
        name={name}
        {...rest}
        {...field}
        labelStyle={{ fontSize: 14 }}
        textBoxVisible={true}
        multiple={false}
        inputName={name}
        textFieldComponent={
          <FormikInput
            variant="outline"
            type="text"
            borderColor="blue.700"
            errorBorderColor="red.500"
            size="lg"
          />
        }
        // onChange={(val: UploadFileProps) => console.log(val)}
        callbackFunction={(val: UploadFileProps) => helpers.setTouched(true) && helpers.setValue(val.base64)}
        accept="image/*"
      />
      <FormErrorMessage>{meta.error && meta.error}</FormErrorMessage>
    </FormControl>
  )
}
export const MultipleFileInputField = (props: FileInputProps): JSX.Element => {
  const { validate, name, label, ...rest } = props
  const [field, meta, helpers] = useField(props)
  // console.log(field, meta, helpers);

  // directly call meta in place of meta.touched to show all errors ::: FIX ISSUE with component not displaying error onDirty
  return (
    <FormControl isInvalid={meta['error'] && meta.touched} mt="5" position="relative">
      <FormLabel htmlFor={[name, 'radio-button'].join('__')} color="bluee.700">
        {label}
      </FormLabel>

      <FileInputComponent
        labelText=""
        id={[name, 'file-upload'].join('__')}
        name={name}
        labelStyle={{ fontSize: 18 }}
        buttonComponent={
          <IconButton icon="attachment" variant="solid" variantColor="pink" type="button">
            Attach
          </IconButton>
        }
        {...rest}
        {...field}
        onChange={(val: UploadFileProps) => console.log(val)}
        callbackFunction={(val: UploadFileProps) => helpers.setTouched(true) && helpers.setValue(val)}
        accept="image/*"
      />
      <FormErrorMessage>{meta.error && meta.error}</FormErrorMessage>
    </FormControl>
  )
}

// ====== Export Field Components here ===========
export {
  InputField,
  PasswordField,
  CheckButtonField,
  CheckField,
  RadioField,
  TextAreaField,
  AutoCompleteField,
  RadioButtonField,
  SelectField,
  FormikForm,
  MultiSelect,
}
