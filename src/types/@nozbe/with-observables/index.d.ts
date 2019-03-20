declare module '@nozbe/with-observables' {
  import { ComponentClass, FunctionComponent } from "react";

  type TriggerProps<P> = [keyof P] | [] | null;
  type GetObservables<A, B> = (props: A) => B;

  type ComponentEnhancer<P = {}> = (component: ComponentClass<P> | FunctionComponent<P>) => ComponentClass<P, any>

  export default function withObservables<PropsInput = {}, ObservablesInput={}>(triggerProps: TriggerProps<PropsInput>, getObservables: (props: PropsInput) => any): ComponentEnhancer<PropsInput>;
}
