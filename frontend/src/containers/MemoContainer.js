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
            list: [],
            index: -1,
            itemForm: {
                title: '',
                description: '',
                no: -1
            }
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

    saveMemo = (memo) => {
        const { title, description } = memo
        const { index } = this.state

        if (index === -1) {
            this.setState({
                list: update(
                    this.state.list, {
                        $push: [{ title, description }]
                    }
                )
            })
        } else {
            this.setState({
                list: update(
                    this.state.list, {
                        [index]: {
                            title: {
                                $set: title
                            },
                            description: {
                                $set: description
                            }
                        }
                    }
                )
            })
        }

        this.clearItemForm()
    }

    deleteMemo = (index) => {
        if (index === -1) {
            this.setState({
                list: []
            })
        } else {
            this.setState({
                list: update(
                    this.state.list, {
                        [index]: {
                            del: {
                                $set: true
                            }
                        }
                    }
                )
            })
        }

        this.clearItemForm()
    }

    changeItemForm = (key, value) => {
        this.setState({
            itemForm: update(
                this.state.itemForm,
                {
                    [key]: {
                        $set: value
                    }
                }
            )
        })
    }

    setClickItem = (index) => {
        this.setState({ 
            index,
            itemForm: this.state.list[index]
        })
    }

    clearItemForm = () => {
        this.setState({
            itemForm: {
                title: '',
                description: '',
                no: -1
            },
            index: -1
        })
    }

    render() {
        return (
            <Grid columns={2} padded>
                <Grid.Column width={5}>
                    <Memo saveMemo={this.saveMemo} index={this.state.index} itemForm={this.state.itemForm} changeItemForm={this.changeItemForm} clearItemForm={this.clearItemForm} deleteMemo={this.deleteMemo}/>
                </Grid.Column>
                <Grid.Column width={11}>
                    <MemoList list={this.state.list} setClickItem={this.setClickItem} index={this.state.index}/>
                </Grid.Column>
            </Grid>
        );
    }
}

export default MemoContainer;