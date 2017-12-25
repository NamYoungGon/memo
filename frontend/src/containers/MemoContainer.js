import React, { Component } from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';

import Memo from './../components/Memo';
import MemoList from './../components/MemoList';

class MemoContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:3000/api/memo/list', {

            }).then((res) => {
                if (!res.data.error) {
                    this.setState({
                        list: res.data.data
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
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
            <Grid columns={2} padded>
                <Grid.Column width={5}>
                    <Memo addMemo={this.addMemo} />
                </Grid.Column>
                <Grid.Column width={11}>
                    <MemoList list={this.state.list} />
                </Grid.Column>
            </Grid>
        );
    }
}

export default MemoContainer;