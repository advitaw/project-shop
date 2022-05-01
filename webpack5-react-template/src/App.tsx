import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";
import AuthRoute from "@/components/AuthRoute";
import { useRecoilState } from "recoil";
import { globalPageList } from "@/store/index";
import BasicLayout from "@/BasicLayout";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
    const history = useHistory();
    const [pageList] = useRecoilState<string[]>(globalPageList);
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <BasicLayout location={window.location}>
                    <Switch>
                        {publicRoutes.map(({ path, component, ...route }) => (
                            <Route
                                key={path}
                                path={path}
                                {...route}
                                render={(routeProps) => {
                                    const Component = component;
                                    return <Component {...routeProps} />;
                                }}
                            />
                        ))}
                        {adminRoutes.map((route) => (
                            <AuthRoute
                                key={route.path}
                                {...route}
                                pageList={pageList}
                                history={history}
                            />
                        ))}
                    </Switch>
                </BasicLayout>
            </Switch>
        </Router>
    );
}
export default App;
