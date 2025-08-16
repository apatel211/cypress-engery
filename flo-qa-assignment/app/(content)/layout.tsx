import { ReactNode } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

type LayoutProps = Readonly<{
  children: ReactNode;
}>;

const Layout = ({ children }: LayoutProps) => (
  <DefaultLayout>{children}</DefaultLayout>
);

export default Layout;
