import React from 'react'
import { PositiveFeedback } from '/imports/ui/components'
import Path from '/imports/ui/path';



const Success: React.FunctionComponent = () => {


    return (
        <PositiveFeedback
            message="Profile Application successful and in review."
            iconName="check-circle"
            // iconSize="6rem"
            buttonLink={Path.profile}
            buttonName="View Profile"
        />


    );
}

export default Success