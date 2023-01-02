import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ConfigProvider } from 'antd';
import { IntlProvider } from "react-intl";

import AppLocale from './languages';

import Router from "./router/Router";
import { usePermissionContext } from './context/PermissionContext';

export default function App() {
  // Redux
  const customise = useSelector(state => state.customise)

  // Lang
  const currentAppLocale = AppLocale[customise.language];

  useEffect(() => {
    document.querySelector("html").setAttribute("lang", customise.language);
  }, [customise]);


  const { fetchApi } = usePermissionContext()

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <ConfigProvider locale={currentAppLocale.antd} direction={customise.direction}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <Router />
      </IntlProvider>
    </ConfigProvider>
  );
}