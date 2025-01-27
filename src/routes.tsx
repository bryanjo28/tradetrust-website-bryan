import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { DemoPage } from "./pages/demo";
import { DemoCreatePage } from "./pages/demoCreate";
import { DemoVerifyPage } from "./pages/demoVerify";
import { EtaPage } from "./pages/eta";
import { EventPage } from "./pages/event";
import { EventPageDetail } from "./pages/event/eventDetail";
import { FaqPage } from "./pages/faq";
import { FaqPageDetail } from "./pages/faqDetail";
import { Guidelines } from "./pages/guidelines";
import { HomePage } from "./pages/home";
import { LearnPage } from "./pages/learn";
import { NewsPage } from "./pages/news";
import { NewsPageDetail } from "./pages/newsDetail";
import { PageNotFound } from "./pages/pageNotFound";
import { PrivacyPolicyPage } from "./pages/privacyPolicy";
import { SettingsAddressBookPage, SettingsAddressResolverPage, SettingsPage } from "./pages/settings";
import { TermsOfUsePage } from "./pages/termsOfUse";
import VerifyPage from "./pages/verify";
import { ViewerPage } from "./pages/viewer";

export const FORM_SG_URL = "https://www.form.gov.sg/635f32c5001b2d0011fff09b";

const renderViewer = (): React.ReactElement => <ViewerPage />;
const renderMagicViewer = (): React.ReactElement => <ViewerPage isMagicDemo />;
// HOT FIX (Temp removal of magic demo until we might decide to kill it)
// eslint-disable-next-line
const demoRoutes = [
  { path: "/demo", exact: true, component: DemoPage },
  {
    path: "/demo/create",
    exact: true,
    component: DemoCreatePage,
    privateRoute: true,
  },
  { path: "/demo/verify", exact: true, component: DemoVerifyPage, privateRoute: true },
  {
    path: "/demo/viewer",
    exact: true,
    render: renderMagicViewer,
    privateRoute: true,
  },
];
export const routes: RouteInterface[] = [
  { path: "/", exact: true, component: HomePage },
  { path: "/verify", exact: true, component: VerifyPage },
  { path: "/viewer", exact: true, render: renderViewer },
  { path: "/faq", exact: true, component: FaqPage },
  { path: "/faq/general-faq", exact: true, component: FaqPageDetail },
  { path: "/faq/product-faq", exact: true, component: FaqPageDetail },
  { path: "/eta", exact: true, component: EtaPage },
  { path: "/settings", exact: true, component: SettingsPage },
  { path: "/settings/address-resolver", exact: true, component: SettingsAddressResolverPage },
  { path: "/settings/address-book", exact: true, component: SettingsAddressBookPage },
  { path: "/news", exact: true, component: NewsPage },
  { path: "/news/:slug", exact: true, component: NewsPageDetail },
  { path: "/learn", exact: true, component: LearnPage },
  { path: "/event", exact: true, component: EventPage },
  { path: "/event/:slug", exact: true, component: EventPageDetail },
  { path: "/guidelines", exact: true, component: Guidelines },
  { path: "/privacy-policy", exact: true, component: PrivacyPolicyPage },
  { path: "/terms-of-use", exact: true, component: TermsOfUsePage },
  { path: "*", component: PageNotFound },
];
export interface RouteInterface {
  path: string;
  exact?: boolean;
  component?: React.FunctionComponent;
  render?: () => JSX.Element;
  privateRoute?: boolean;
}
interface RouteProps {
  routes: RouteInterface[];
}

const routeMapper = (route: RouteInterface, id: number) => {
  const { privateRoute } = route;
  return privateRoute ? <PrivateRoute key={id} {...route} /> : <Route key={id} {...route} />;
};

export const Routes = ({ routes: routeItems }: RouteProps): React.ReactElement => {
  return <Switch>{routeItems.map(routeMapper)}</Switch>;
};

export const FormSgContactLink: React.FunctionComponent<React.HTMLProps<HTMLAnchorElement>> = (props) => {
  return (
    <a href={FORM_SG_URL} target="_blank" rel="noopener noreferrer" {...props}>
      {props.children}
    </a>
  );
};
