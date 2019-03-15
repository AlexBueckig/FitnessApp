
declare module '@nozbe/with-observables' {
  import { ComponentClass } from 'react';

  export type ComponentEnhancer = <Props>(component: ComponentClass<Props>) => ComponentClass<any, any>

  export interface WithObservables {
    (observe: string[], enhancerFunction: (props: any) => any): ComponentEnhancer;
  }

  const withObservables: WithObservables;
  export default withObservables;
}
