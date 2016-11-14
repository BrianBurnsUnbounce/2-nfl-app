import React from 'react';

import TeamButton from './TeamButton';

var teams = [
    "Arizona Cardinals",
    "Atlanta Falcons"
];


class Home extends React.Component {
    render() {
        for (var i = 0; i < teams.length; i++) {
            return (
                <TeamButton teamName={teams[i]} />
            )
        }

    }

}

ReactDOM.render(
    <Home />,
    document.getElementById('app')
)




