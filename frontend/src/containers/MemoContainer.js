import React, { Component } from 'react';
import update from 'react-addons-update';

import Memo from './../components/Memo';
import MemoList from './../components/MemoList';

class MemoContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
    }

    addMemo = (memo) => {
        this.setState({
            list: update(
                this.state.list, {
                    $push: [memo]
                }
            )
        })
    }

    render() {
        return (
            <div>
                <MemoList list={this.state.list} />
                <hr/>
                <Memo addMemo={this.addMemo} />
            </div>
        );
    }
}

export default MemoContainer;