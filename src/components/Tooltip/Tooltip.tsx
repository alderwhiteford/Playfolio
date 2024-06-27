import { Tooltip, Zoom } from "@mui/material";
import { ReactElement } from "react";

type PlayfolioTooltipProps = {
    title: string,
    children: ReactElement;
}

export default function PlayfolioTooltip({ title, children }: PlayfolioTooltipProps) {
    return (
        <Tooltip
            title={title}
            slotProps={{
                popper: {
                    modifiers: [
                    {
                        name: 'offset',
                        options: {
                        offset: [0, -5],
                        },
                    },
                    ],
                },
                }}
                arrow
                TransitionComponent={Zoom}
                placement="top"
            >
            {children}
        </Tooltip>
    )
}