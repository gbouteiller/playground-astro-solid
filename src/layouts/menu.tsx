import {
  NavigationMenu,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"

// MAIN ************************************************************************************************************************************
export const Menu = () => (
  <NavigationMenu>
    <NavigationMenuTrigger as="a" href="/">Accueil</NavigationMenuTrigger>
    <NavigationMenuTrigger as="a" href="/a-propos">A propos</NavigationMenuTrigger>
  </NavigationMenu>
)

