import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props: any) {
    const { path, backUrl, pageList, ...otherProps } = props;

    if (pageList && pageList.indexOf(path) > -1) {
        return <Route {...otherProps} />;
    } else {
        return <Redirect to={backUrl} />;
    }
}

export default AuthRoute;
