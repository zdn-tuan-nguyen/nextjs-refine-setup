"use client";

import { useNotificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { SessionProvider } from "next-auth/react";
import React from "react";

import { ColorModeContextProvider } from "@/contexts/color-mode";
import { useAuthProvider } from "@/providers/auth-provider";
import { dataProvider } from "@/providers/data-provider";
import { refineResources } from "@/resources/refine-resources";

type RefineContextProps = {
  defaultMode?: string;
};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {
  defaultMode?: string;
};

const App = ({ children, defaultMode }: React.PropsWithChildren<AppProps>) => {
  const authProvider = useAuthProvider();

  return (
    <>
      <ColorModeContextProvider defaultMode={defaultMode}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider}
          notificationProvider={useNotificationProvider}
          authProvider={authProvider}
          resources={refineResources}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
          }}
        >
          {children}
          <RefineKbar />
        </Refine>
      </ColorModeContextProvider>
    </>
  );
};
