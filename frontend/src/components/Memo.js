import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';

class Memo extends Component {
    handleChange = e => {
        const { name, value } = e.target
        this.props.changeItemForm(name, value)
    }

    handleClickSave = () => {
        const { saveMemo } = this.props
        const { title, description, no } = this.props.itemForm
        if (!title.trim() || !description.trim()) {
            return false
        }

        axios.post('http://localhost:3000/api/memo/save', {
                title,
                description,
                no
            }).then((res) => {
                saveMemo({ title, description })
            })
            .catch((err) => {
                console.log(err)
            })           
    } 

    handleClickDelete = (e) => {
        const { index, deleteMemo } = this.props
        const { no } = this.props.itemForm

        if (index === -1) return false

        axios.post('http://localhost:3000/api/memo/delete', {
                no
            }).then((res) => {
                deleteMemo(index)
            })
            .catch((err) => {
                console.log(err)
            })     
    }

    handleClickDeleteAll = (e) => {
        const { deleteMemo } = this.props

        axios.post('http://localhost:3000/api/memo/delete', {
                no: -1
            }).then((res) => {
                deleteMemo(-1)
            })
            .catch((err) => {
                console.log(err)
            })     
    }

    render() {
        const { index } = this.props
        const { title, description } = this.props.itemForm
        const isDisabled = index === -1 ? true : false

        return (
            <Grid padded>
                <Grid.Row>
                    <h4>입력</h4>
                </Grid.Row>
                <div className="one row column"></div>
                <div className="container">
                    <div>
                        <label>제목</label>
                    </div>
                    <div>
                        <input type="text" name="title" value={title} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>내용</label>
                    </div>
                    <div>
                        <textarea rows="5" name="description" value={description} onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                        <button name="save" onClick={this.handleClickSave}>Save</button>
                        <button name="clear" onClick={this.props.clearItemForm}>Clear</button>
                        <button name="delete" disabled={isDisabled} onClick={this.handleClickDelete}>Delete</button>
                        <button name="deleteAll" onClick={this.handleClickDeleteAll}>Delete All</button>
                    </div>
                
                </div>
            </Grid>
        );
    }
}

export default Memo;