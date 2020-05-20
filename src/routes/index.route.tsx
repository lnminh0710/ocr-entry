import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PublicTypeRoute from "./public/public.type.route";
import PrivateTypeRoute from "./private/private.type.route";

import LoadingComponent from "components/ui-own/progress/loader/loader.component";
import LayoutComponent from "components/ui-own/layout-app/layout.component";

import AuthProvider from "context/auth.context";
import ThemeProvider from "context/theme.context";
import SnackbarProvider from "context/notification.context";

const Root: React.FC = () => {
    return (
        <Router>
            <ThemeProvider>
                <SnackbarProvider>
                    <AuthProvider>
                        <LayoutComponent>
                            <Suspense fallback={<LoadingComponent />}>
                                <PublicTypeRoute />
                            </Suspense>
                        </LayoutComponent>
                    </AuthProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </Router>
    );
};

export default Root;
