import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class MemoList extends Component {
    handleClickItem = (e) => {
        const target = e.currentTarget
        const index = parseInt(target.dataset.idx, 10)
        this.props.setClickItem(index)
    }

    render() {
        const { list } = this.props
        const listLen = list.length
        const listStr = []
        let listItem = null

        for (let i = 0, keyIndex = 0; i < listLen; i++) {
            listItem = list[i]
            const { title, description, del } = listItem

            if (del === true) continue

            listStr.push((
                <div className="list-item" data-active={this.props.index === i ? true : false} data-idx={i} key={keyIndex} onClick={this.handleClickItem}>
                    <h5 className="list-item-title">
                        T : {title}  
                    </h5>
                    <p className="list-item-description">
                        D : {description}
                    </p>
                </div>
            ))

            keyIndex++
        }

        return (
            <Grid padded>
                <Grid.Row>
                    <h4>목록</h4>
                </Grid.Row>
                <div className="one column row"></div>
                <div className="one column row">
                    <div className="column">
                        {listStr}
                    </div>
                </div>
            </Grid>
        );
    }
}

export default MemoList;