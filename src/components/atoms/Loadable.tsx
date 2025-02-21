
import { ExoticComponent, Suspense, SuspenseProps } from 'react';
import { Loading } from "./Loading";

export const Loadable = (Component: ExoticComponent<SuspenseProps>) => (props: object) => {
    return (
        <Suspense fallback={<Loading />}>
            <Component {...props} />
        </Suspense>
    );
};
