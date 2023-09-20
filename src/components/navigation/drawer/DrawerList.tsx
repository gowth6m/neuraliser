import { Box, List } from "@mui/material";

import React, { FC } from "react";

import { DrawerListTitle } from "./DrawerListTitle";
import { DrawerItem, DrawerItemProps } from "./DrawerItem";

type DrawerListProps = {
    title: string;
    listItems: DrawerItemProps[];
};

const DrawerList: FC<DrawerListProps> = ({ title, listItems }) => {
    return (
        <React.Fragment>
            <Box sx={{ paddingTop: 1 }}>
                {title && <DrawerListTitle title={title} />}
                <List sx={{ paddingY: 0 }}>
                    {listItems.map((item: DrawerItemProps) => (
                        <DrawerItem
                            key={item.text}
                            text={item.text}
                            icon={item.icon}
                            route={item.route}
                            onClick={item.onClick}
                        />
                    ))}
                </List>
            </Box>
        </React.Fragment>
    );
};

export { DrawerList };
export type { DrawerItemProps };
