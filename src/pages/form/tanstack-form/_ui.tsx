import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextArea,
  type TextFieldErrorMessageProps,
  type TextFieldInputProps,
  type TextFieldLabelProps,
  type TextFieldProps,
  type TextFieldTextAreaProps,
} from "@/components/ui/text-field"
import {cn} from "@/lib/utils"
import type {PolymorphicProps} from "@kobalte/core"
import {FieldApi} from "@tanstack/solid-form"
import {splitProps, type ValidComponent} from "solid-js"

// INPUT ************************************************************************************************************************************
export const FormInput = <T extends ValidComponent = "input">(props: PolymorphicProps<T, FormInputProps<T>>) => {
  const [local, others] = splitProps(props as FormInputProps, ["field"])
  return <TextFieldInput onBlur={local.field().handleBlur} {...others} />
}
export type FormInputProps<T extends ValidComponent = "input"> = TextFieldInputProps<T> & {field: () => FieldApi<any, any, any>}

// ITEM ************************************************************************************************************************************
export const FormItem = <T extends ValidComponent = "div">(props: PolymorphicProps<T, FormItemProps<T>>) => {
  const [local, others] = splitProps(props as FormItemProps, ["class", "field"])
  return (
    <TextField
      name={local.field().name}
      value={local.field().state.value}
      onChange={local.field().handleChange}
      validationState={local.field().state.meta.errors.length > 0 ? "invalid" : "valid"}
      class={cn("space-y-2", local.class)}
      {...others}
    />
  )
}
export type FormItemProps<T extends ValidComponent = "div"> = TextFieldProps<T> & {field: () => FieldApi<any, any, any>}

// LABEL ***********************************************************************************************************************************
export const FormLabel = TextFieldLabel
export type FormLabelProps<T extends ValidComponent = "label"> = TextFieldLabelProps<T>

// MESSAGE *********************************************************************************************************************************
export const FormMessage = <T extends ValidComponent = "div">(props: PolymorphicProps<T, FormMessageProps<T>>) => {
  const [local, others] = splitProps(props as FormMessageProps, ["field"])
  return <TextFieldErrorMessage {...others}>{local.field().state.meta.errors[0]?.toString().split(",")[0]}</TextFieldErrorMessage>
}
export type FormMessageProps<T extends ValidComponent = "div"> = TextFieldErrorMessageProps<T> & {field: () => FieldApi<any, any, any>}

// TEXTAREA ********************************************************************************************************************************
export const FormTextarea = <T extends ValidComponent = "textarea">(props: PolymorphicProps<T, FormTextareaProps<T>>) => {
  const [local, others] = splitProps(props as FormTextareaProps, ["field"])
  return (
    <TextFieldTextArea onBlur={local.field().handleBlur} {...others}>
      {/* MONKEY PATCH: textarea set as value instead of innerHTML */}
      {local.field().state.value}
    </TextFieldTextArea>
  )
}
export type FormTextareaProps<T extends ValidComponent = "textarea"> = TextFieldTextAreaProps<T> & {field: () => FieldApi<any, any, any>}
