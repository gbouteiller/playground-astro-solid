import {cn} from "@/lib/utils"
import type {PolymorphicProps} from "@kobalte/core"
import {
	// Content,
	// Icon,
	// Item,
	// ItemDescription,
	// ItemLabel,
	// Portal,
	Root,
	Trigger,
	Viewport,
	// type NavigationMenuContentProps as ContentProps,
	// type NavigationMenuItemDescriptionProps as ItemDescriptionProps,
	// type NavigationMenuItemLabelProps as ItemLabelProps,
	// type NavigationMenuItemProps as ItemProps,
	type NavigationMenuRootProps,
	type NavigationMenuTriggerProps as TriggerProps,
	type NavigationMenuViewportProps as ViewportProps,
} from "@kobalte/core/navigation-menu"
import {splitProps, type JSX, type ValidComponent} from "solid-js"
// export {Menu as NavigationMenuItem} from "@kobalte/core/navigation-menu"

type NavigationMenuProps<T extends ValidComponent = "ul"> = NavigationMenuRootProps<T> & {
	class?: string | undefined
	children?: JSX.Element
}

export const NavigationMenu = <T extends ValidComponent = "ul">(props: PolymorphicProps<T, NavigationMenuProps<T>>) => {
	const [local, others] = splitProps(props as NavigationMenuProps, ["class", "children"])
	return (
		<Root
			gutter={6}
			class={cn(
				"group/menu flex w-max flex-1 list-none items-center justify-center data-[orientation=vertical]:flex-col [&>li]:w-full",
				local.class,
			)}
			{...others}
		>
			{local.children}
			<NavigationMenuViewport />
		</Root>
	)
}

type NavigationMenuTriggerProps<T extends ValidComponent = "button"> = TriggerProps<T> & {
	class?: string | undefined
}

export const NavigationMenuTrigger = <T extends ValidComponent = "button">(props: PolymorphicProps<T, NavigationMenuTriggerProps<T>>) => {
	const [local, others] = splitProps(props as NavigationMenuTriggerProps, ["class"])
	return (
		<Trigger
			class={cn(
				"group/trigger inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[expanded]:bg-accent/50",
				local.class,
			)}
			{...others}
		/>
	)
}
// export const NavigationMenuIcon = () => {
// 	return (
// 		<Icon aria-hidden="true">
// 			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
// 			<svg
// 				xmlns="http://www.w3.org/2000/svg"
// 				viewBox="0 0 24 24"
// 				fill="none"
// 				stroke="currentColor"
// 				stroke-width="2"
// 				stroke-linecap="round"
// 				stroke-linejoin="round"
// 				class="relative top-px ml-1 size-3 transition duration-200 group-data-[expanded]/trigger:rotate-180 group-data-[orientation=vertical]/menu:-rotate-90 group-data-[orientation=vertical]/menu:group-data-[expanded]/trigger:rotate-90"
// 			>
// 				<path d="M6 9l6 6l6 -6" />
// 			</svg>
// 		</Icon>
// 	)
// }

type NavigationMenuViewportProps<T extends ValidComponent = "li"> = ViewportProps<T> & {
	class?: string | undefined
}

export const NavigationMenuViewport = <T extends ValidComponent = "li">(props: PolymorphicProps<T, NavigationMenuViewportProps<T>>) => {
	const [local, others] = splitProps(props as NavigationMenuViewportProps, ["class"])
	return (
		<Viewport
			class={cn(
				"pointer-events-none z-[1000] flex h-[var(--kb-navigation-menu-viewport-height)] w-[var(--kb-navigation-menu-viewport-width)] origin-[var(--kb-menu-content-transform-origin)] items-center justify-center overflow-x-clip overflow-y-visible rounded-md border bg-popover opacity-0 shadow-lg transition-[width,height] duration-200 ease-in data-[expanded]:pointer-events-auto data-[orientation=vertical]:overflow-y-clip data-[orientation=vertical]:overflow-x-visible data-[expanded]:rounded-md data-[expanded]:opacity-100 data-[expanded]:ease-out",
				local.class,
			)}
			{...others}
		/>
	)
}

// type NavigationMenuContentProps<T extends ValidComponent = "ul"> = ContentProps<T> & {
// 	class?: string | undefined
// }

// export const NavigationMenuContent = <T extends ValidComponent = "ul">(props: PolymorphicProps<T, NavigationMenuContentProps<T>>) => {
// 	const [local, others] = splitProps(props as NavigationMenuContentProps, ["class"])
// 	return (
// 		<Portal>
// 			<Content
// 				class={cn(
// 					// base settings
// 					"pointer-events-none absolute left-0 top-0 box-border p-4 focus:outline-none data-[expanded]:pointer-events-auto",
// 					// base animation settings
// 					"data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
// 					// left to right
// 					"data-[orientation=horizontal]:data-[motion=from-start]:slide-in-from-left-52 data-[orientation=horizontal]:data-[motion=to-end]:slide-out-to-right-52",
// 					// right to left
// 					"data-[orientation=horizontal]:data-[motion=from-end]:slide-in-from-right-52 data-[orientation=horizontal]:data-[motion=to-start]:slide-out-to-left-52",
// 					// top to bottom
// 					"data-[orientation=vertical]:data-[motion=from-start]:slide-in-from-top-52 data-[orientation=vertical]:data-[motion=to-end]:slide-out-to-bottom-52",
// 					//bottom to top
// 					"data-[orientation=vertical]:data-[motion=from-end]:slide-in-from-bottom-52 data-[orientation=vertical]:data-[motion=to-start]:slide-out-to-bottom-52",
// 					local.class,
// 				)}
// 				{...others}
// 			/>
// 		</Portal>
// 	)
// }

// type NavigationMenuLinkProps<T extends ValidComponent = "a"> = ItemProps<T> & {
// 	class?: string | undefined
// }

// export const NavigationMenuLink = <T extends ValidComponent = "a">(props: PolymorphicProps<T, NavigationMenuLinkProps<T>>) => {
// 	const [local, others] = splitProps(props as NavigationMenuLinkProps, ["class"])
// 	return (
// 		<Item
// 			class={cn(
// 				"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
// 				local.class,
// 			)}
// 			{...others}
// 		/>
// 	)
// }

// type NavigationMenuLabelProps<T extends ValidComponent = "div"> = ItemLabelProps<T> & {
// 	class?: string | undefined
// }

// export const NavigationMenuLabel = <T extends ValidComponent = "div">(props: PolymorphicProps<T, NavigationMenuLabelProps<T>>) => {
// 	const [local, others] = splitProps(props as NavigationMenuLabelProps, ["class"])
// 	return <ItemLabel class={cn("text-sm font-medium leading-none", local.class)} {...others} />
// }

// type NavigationMenuDescriptionProps<T extends ValidComponent = "div"> = ItemDescriptionProps<T> & {
// 	class?: string | undefined
// }

// export const NavigationMenuDescription = <T extends ValidComponent = "div">(
// 	props: PolymorphicProps<T, NavigationMenuDescriptionProps<T>>,
// ) => {
// 	const [local, others] = splitProps(props as NavigationMenuDescriptionProps, ["class"])
// 	return <ItemDescription class={cn("text-sm leading-snug text-muted-foreground", local.class)} {...others} />
// }
