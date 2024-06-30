import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import type {Nav} from "@/lib/utils"
import {For} from "solid-js"

export default ({active, navs}: {active: string; navs: Nav[]}) => (
  <Tabs defaultValue={active}>
    <div class="flex items-center">
      <TabsList>
        <For each={navs}>
          {({id, href, text}) => (
            <TabsTrigger value={id}>
              <a href={href}>{text}</a>
            </TabsTrigger>
          )}
        </For>
      </TabsList>
    </div>
  </Tabs>
)
