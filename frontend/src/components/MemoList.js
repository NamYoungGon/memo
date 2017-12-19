import React, { Component } from 'react';
import { Accordion, Icon, Grid } from 'semantic-ui-react';

class MemoList extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        const { list } = this.props
        const listLen = list.length
        const listStr = []
        let listItem = null

        for (let i = 0, keyIndex = 0; i < listLen; i++) {
            listItem = list[i]
            listStr.push((
                <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick} key={keyIndex++}>
                    <Icon name='dropdown' />
                    {listItem.title}
                </Accordion.Title>
            ))
            listStr.push((
                <Accordion.Content active={activeIndex === i} key={keyIndex++}>
                    <p>
                        {listItem.description}
                    </p>
                </Accordion.Content>
            ))
        }

        return (
            <Grid padded>
                <Grid.Row>
                    <h4>목록</h4>
                </Grid.Row>
                <div className="one column row"></div>
                <div className="one column row">
                    <Accordion fluid styled>
                        {listStr}
                    </Accordion>
                </div>
            </Grid>
        );
    }
}

export default MemoList;