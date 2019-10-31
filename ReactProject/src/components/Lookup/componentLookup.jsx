import React from 'react'

/**
 * Todo: create class for returning data from a lookup field
 * * CONVERSE WITH TEAM ABOUT HOW THEY WANT TO DISPLAY THINGS
 * ? What will they pass as props? / Should there be seperate return components?
 * @param props would be ideal if it was an objetct containing an id field
 */

export class Lookup extends React.Component {
    constructor(props) {
        super(props);
        data:props;
        this.state = {
            id:props.id,
            data:{}
        }
        this.setData = this.setData.bind(this)
    }

    /
    setData(id) {

    }
}