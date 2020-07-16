import React from 'react';
import { PositiveFeedback } from '/imports/ui/components';
import Path from '/imports/ui/path';
const Success = () => {
    return (<PositiveFeedback message="Profile Application successful and in review." iconName="check-circle" buttonLink={Path.root} buttonName="Visit Directory"/>);
};
export default Success;
