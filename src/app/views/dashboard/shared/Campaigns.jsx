import React from 'react'
import { Small } from 'app/components/Typography'
import { Box, useTheme } from '@mui/system'
import { SimpleCard, MatxProgressBar } from 'app/components'

const Campaigns = () => {
    const theme = useTheme()
    const secondary = theme.palette.text.secondary

    return (
        <div>
            <SimpleCard title="Inventoery Status">
                <Box sx={{ pt: 1 }} />
                <MatxProgressBar
                    value={75}
                    color="primary"
                    text="In-Use"
                />
                <Box sx={{ py: '4px' }} />
                <MatxProgressBar
                    value={45}
                    color="secondary"
                    text="In-Stcok"
                />
                <Box sx={{ py: '4px' }} />
                <MatxProgressBar
                    value={15}
                    color="primary"
                    text="Replacement"
                />
                <Box sx={{ py: '4px' }} />
                <MatxProgressBar
                    value={35}
                    color="secondary"
                    text="Fragment"
                />
                <Box sx={{ py: '4px' }} />
                <MatxProgressBar
                    value={55}
                    color="primary"
                    text="Pending for Approvel"
                />
            </SimpleCard>
        </div>
    )
}

export default Campaigns
