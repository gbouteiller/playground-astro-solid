import {getContactMessage, zContactValues, type ContactState, type ContactValues} from "@/actions/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Toaster, showToast} from "@/components/ui/toast"
import {cn} from "@/lib/utils"
import {createForm, reset, zodForm, type SubmitHandler} from "@modular-forms/solid"
import {actions, getActionProps} from "astro:actions"
import type {ParentComponent} from "solid-js"
import {FormInput, FormItem, FormLabel, FormMessage, FormTextarea} from "./_ui"

const ContactForm: ParentComponent<ContactFormProps> = (props) => {
  const [form, {Field, Form}] = createForm<ContactValues>({
    initialValues: props.defaultValues,
    validate: zodForm(zContactValues),
    validateOn: "touched",
  })

  // if (props.defaultState.error instanceof ActionInputError) {
  //   Object.entries(props.defaultState.error.fields).forEach(([name, errors]) =>
  //     setError(form, name as keyof ContactValues, errors?.[0] ?? "")
  //   )
  // }

  const handleSubmit: SubmitHandler<ContactValues> = async (_values, event) => {
    const state = await actions.sendEmail.safe(new FormData(event.currentTarget))
    const {code, description} = getContactMessage(state) ?? {}
    if (code === "SUCCESS") reset(form)
    showToast(code === "SUCCESS" ? {title: "Succès", description, variant: "success"} : {title: "Erreur", description, variant: "error"})
  }

  return (
    <Form method="post" onSubmit={handleSubmit} class="space-y-4">
      <input {...getActionProps(actions.sendEmail)} />
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>N'hésitez pas à nous contacter si vous avez la moindre question</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-8">
          <div class="flex flex-col gap-8 sm:flex-row">
            <Field name="forename">
              {(field, props) => (
                <FormItem field={field} class="flex-1">
                  <FormLabel>Prénom</FormLabel>
                  <FormInput props={props} type="text" placeholder="Votre prénom..." />
                  <FormMessage field={field} />
                </FormItem>
              )}
            </Field>
            <Field name="surname">
              {(field, props) => (
                <FormItem field={field} class="flex-1">
                  <FormLabel>Nom</FormLabel>
                  <FormInput props={props} type="text" placeholder="Votre nom..." />
                  <FormMessage field={field} />
                </FormItem>
              )}
            </Field>
          </div>
          <Field name="email">
            {(field, props) => (
              <FormItem field={field} class="flex-1">
                <FormLabel>Votre courriel</FormLabel>
                <FormInput props={props} type="email" placeholder="Votre courriel..." />
                <FormMessage field={field} />
              </FormItem>
            )}
          </Field>
          <Field name="message">
            {(field, props) => (
              <FormItem field={field} class="flex-1">
                <FormLabel>Votre message</FormLabel>
                <FormTextarea props={props} field={field} rows={8} placeholder="Votre message..." />
                <FormMessage field={field} />
              </FormItem>
            )}
          </Field>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button type="submit" disabled={form.submitting} class="flex gap-2">
            <span class={cn("h-4 w-4", form.submitting ? "i-lucide-loader animate-spin" : "i-lucide-send")}></span>
            <span>Envoyer</span>
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
      {props.children}
    </Form>
  )
}
export default ContactForm
export type ContactFormProps = {defaultValues: ContactValues; defaultState: ContactState}
