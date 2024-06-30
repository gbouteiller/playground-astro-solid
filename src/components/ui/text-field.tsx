import type {PolymorphicProps} from "@kobalte/core"
import * as P from "@kobalte/core/text-field"
import type {ValidComponent} from "solid-js"
import {splitProps} from "solid-js"
import {tv} from "tailwind-variants"

// ROOT ************************************************************************************************************************************
export const TextField = P.Root
export type TextFieldProps<T extends ValidComponent = "div"> = P.TextFieldRootProps<T> & {class?: string | undefined}

// INPUT ***********************************************************************************************************************************
export const INPUT = tv({
  base: `flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
  file:border-0 file:bg-transparent file:text-sm file:font-medium 
  placeholder:text-muted-foreground 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:cursor-not-allowed disabled:opacity-50
  aria-[invalid=true]:ring-destructive aria-[invalid=true]:border-destructive`,
})

export type TextFieldInputProps<T extends ValidComponent = "input"> = P.TextFieldInputProps<T> & {
  class?: string | undefined
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
}

export const TextFieldInput = <T extends ValidComponent = "input">(props: PolymorphicProps<T, TextFieldInputProps<T>>) => {
  const [local, others] = splitProps(props as TextFieldInputProps, ["type", "class"])
  return <P.Input type={local.type} class={INPUT({class: local.class})} {...others} />
}

// TEXTAREA ********************************************************************************************************************************
export const TEXTAREA = tv({
  base: `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
  placeholder:text-muted-foreground 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:cursor-not-allowed disabled:opacity-50
  aria-[invalid=true]:ring-destructive aria-[invalid=true]:border-destructive`,
})

export type TextFieldTextAreaProps<T extends ValidComponent = "textarea"> = P.TextFieldTextAreaProps<T> & {
  class?: string | undefined
}

export const TextFieldTextArea = <T extends ValidComponent = "textarea">(props: PolymorphicProps<T, TextFieldTextAreaProps<T>>) => {
  const [local, others] = splitProps(props as TextFieldTextAreaProps, ["class"])
  return <P.TextArea class={TEXTAREA({class: local.class})} {...others} />
}

// LABEL ***********************************************************************************************************************************
export const LABEL = tv({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  variants: {
    variant: {
      label: "data-[invalid]:text-destructive",
      error: "text-destructive",
      description: "font-normal text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "label",
  },
})

export type TextFieldLabelProps<T extends ValidComponent = "label"> = P.TextFieldLabelProps<T> & {
  class?: string | undefined
}

export const TextFieldLabel = <T extends ValidComponent = "label">(props: PolymorphicProps<T, TextFieldLabelProps<T>>) => {
  const [local, others] = splitProps(props as TextFieldLabelProps, ["class"])
  return <P.Label class={LABEL({class: local.class})} {...others} />
}

// DESCRIPTION *****************************************************************************************************************************
export type TextFieldDescriptionProps<T extends ValidComponent = "div"> = P.TextFieldDescriptionProps<T> & {
  class?: string | undefined
}

export const TextFieldDescription = <T extends ValidComponent = "div">(props: PolymorphicProps<T, TextFieldDescriptionProps<T>>) => {
  const [local, others] = splitProps(props as TextFieldDescriptionProps, ["class"])
  return <P.Description class={LABEL({variant: "description", class: local.class})} {...others} />
}

// ERROR MESSAGE ***************************************************************************************************************************
export type TextFieldErrorMessageProps<T extends ValidComponent = "div"> = P.TextFieldErrorMessageProps<T> & {
  class?: string | undefined
}

export const TextFieldErrorMessage = <T extends ValidComponent = "div">(props: PolymorphicProps<T, TextFieldErrorMessageProps<T>>) => {
  const [local, others] = splitProps(props as TextFieldErrorMessageProps, ["class"])
  return <P.ErrorMessage class={LABEL({variant: "error", class: local.class})} {...others} />
}
