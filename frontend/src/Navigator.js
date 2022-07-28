import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import TaskList from "./screens/TaskList";
import Auth from "./screens/Auth";
import { create } from "react-test-renderer";

const MainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: TaskList
    }
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
    initialRouteName: 'Auth'
})

export default createAppContainer(MainNavigator)