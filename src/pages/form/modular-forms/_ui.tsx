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
import type {FieldElementProps, FieldPath, FieldStore, FieldValues} from "@modular-forms/solid"
import {splitProps, type ValidComponent} from "solid-js"

// INPUT ************************************************************************************************************************************
export const FormInput = <V extends FieldValues, N extends FieldPath<V>, T extends ValidComponent = "input">(
  props: PolymorphicProps<T, FormInputProps<V, N, T>>
) => {
  const [local, others] = splitProps(props as FormInputProps, ["props"])
  return <TextFieldInput {...local.props} {...others} />
}

export type FormInputProps<
  V extends FieldValues = FieldValues,
  N extends FieldPath<V> = FieldPath<V>,
  T extends ValidComponent = "input",
> = TextFieldInputProps<T> & {props: FieldElementProps<V, N>}

// ITEM ************************************************************************************************************************************
export const FormItem = <V extends FieldValues, N extends FieldPath<V>, T extends ValidComponent = "div">(
  props: PolymorphicProps<T, FormItemProps<V, N, T>>
) => {
  const [local, others] = splitProps(props as FormItemProps<V, N>, ["class", "field"])
  return (
    <TextField
      name={local.field.name}
      value={`${local.field.value}` ?? undefined}
      validationState={local.field.error ? "invalid" : "valid"}
      class={cn("space-y-2", local.class)}
      {...others}
    />
  )
}
export type FormItemProps<
  V extends FieldValues = FieldValues,
  N extends FieldPath<V> = FieldPath<V>,
  T extends ValidComponent = "div",
> = TextFieldProps<T> & {field: FieldStore<V, N>}

// LABEL ***********************************************************************************************************************************
export const FormLabel = TextFieldLabel
export type FormLabelProps<T extends ValidComponent = "label"> = TextFieldLabelProps<T>

// MESSAGE *********************************************************************************************************************************
export const FormMessage = <V extends FieldValues, N extends FieldPath<V>, T extends ValidComponent = "div">(
  props: PolymorphicProps<T, FormMessageProps<V, N, T>>
) => {
  const [local, others] = splitProps(props as FormMessageProps<V, N, T>, ["field"])
  return <TextFieldErrorMessage {...others}>{local.field.error}</TextFieldErrorMessage>
}
export type FormMessageProps<
  V extends FieldValues = FieldValues,
  N extends FieldPath<V> = FieldPath<V>,
  T extends ValidComponent = "div",
> = TextFieldErrorMessageProps<T> & {field: FieldStore<V, N>}

// TEXTAREA ********************************************************************************************************************************
export const FormTextarea = <V extends FieldValues, N extends FieldPath<V>, T extends ValidComponent = "textarea">(
  props: PolymorphicProps<T, FormTextareaProps<V, N, T>>
) => {
  const [local, others] = splitProps(props as unknown as FormTextareaProps, ["field", "props"])
  return (
    <TextFieldTextArea {...local.props} {...others}>
      {/* MONKEY PATCH: textarea set as value instead of innerHTML */}
      {local.field.value}
    </TextFieldTextArea>
  )
}

export type FormTextareaProps<
  V extends FieldValues = FieldValues,
  N extends FieldPath<V> = FieldPath<V>,
  T extends ValidComponent = "textarea",
> = TextFieldTextAreaProps<T> & {field: FieldStore<V, N>} & {props: FieldElementProps<V, N>}
