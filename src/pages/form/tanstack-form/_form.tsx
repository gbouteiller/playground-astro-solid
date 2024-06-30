import {getFormState, toFormData} from "@/actions/tanstack-form"
import {getContactMessage, zContactValues, type ContactState, type ContactValues} from "@/actions/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Toaster, showToast} from "@/components/ui/toast"
import {cn} from "@/lib/utils"
import {createForm, mergeForm} from "@tanstack/solid-form"
import {zodValidator} from "@tanstack/zod-form-adapter"
import {actions, getActionProps} from "astro:actions"
import {FormInput, FormItem, FormLabel, FormMessage, FormTextarea} from "./_ui"

export default ({children, defaultState, defaultValues}: ContactFormProps) => {
  const {Field, handleSubmit, reset, Subscribe} = createForm<ContactValues>(() => ({
    defaultValues,
    transform: {fn: (baseForm) => mergeForm(baseForm, getFormState(defaultState)), deps: [defaultState]},
    onSubmit: async ({value}) => {
      const state = await actions.sendEmail.safe(toFormData(value))
      const {code, description} = getContactMessage(state) ?? {}
      if (code === "SUCCESS") reset()
      showToast(code === "SUCCESS" ? {title: "Succès", description, variant: "success"} : {title: "Erreur", description, variant: "error"})
    },
  }))

  function onSubmit(e: Event & {currentTarget: HTMLFormElement; submitter: HTMLElement; target: Element}) {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit()
  }

  return (
    <form method="post" noValidate onSubmit={onSubmit} class="space-y-4">
      <input {...getActionProps(actions.sendEmail)} />
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>N'hésitez pas à nous contacter si vous avez la moindre question</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div class="flex flex-col gap-8 sm:flex-row">
            <Field
              name="forename"
              validatorAdapter={zodValidator()}
              validators={{onChange: zContactValues.shape.forename}}
              children={(field) => (
                <FormItem field={field} class="flex-1">
                  <FormLabel>Prénom</FormLabel>
                  <FormInput field={field} type="text" placeholder="Votre prénom..." />
                  <FormMessage field={field} />
                </FormItem>
              )}
            />
            <Field
              name="surname"
              validatorAdapter={zodValidator()}
              validators={{onChange: zContactValues.shape.surname}}
              children={(field) => (
                <FormItem field={field} class="flex-1">
                  <FormLabel>Nom</FormLabel>
                  <FormInput field={field} type="text" placeholder="Votre nom..." />
                  <FormMessage field={field} />
                </FormItem>
              )}
            />
          </div>
          <Field
            name="email"
            validatorAdapter={zodValidator()}
            validators={{onChange: zContactValues.shape.email}}
            children={(field) => (
              <FormItem field={field} class="flex-1">
                <FormLabel>Votre courriel</FormLabel>
                <FormInput field={field} type="email" placeholder="Votre courriel..." />
                <FormMessage field={field} />
              </FormItem>
            )}
          />
          <Field
            name="message"
            validatorAdapter={zodValidator()}
            validators={{onChange: zContactValues.shape.message}}
            children={(field) => (
              <FormItem field={field} class="flex-1">
                <FormLabel>Votre message</FormLabel>
                <FormTextarea field={field} rows={8} placeholder="Votre message..." />
                <FormMessage field={field} />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter class="flex justify-end">
          <Subscribe
            selector={({isSubmitting}) => ({isSubmitting})}
            children={(state) => (
              <Button type="submit" disabled={state().isSubmitting} class="flex gap-2">
                <span class={cn("h-4 w-4", state().isSubmitting ? "i-lucide-loader animate-spin" : "i-lucide-send")}></span>
                <span>Envoyer</span>
              </Button>
            )}
          />
        </CardFooter>
      </Card>
      <Toaster />
      {children}
    </form>
  )
}
export type ContactFormProps = {children?: any; defaultValues: ContactValues; defaultState: ContactState}
