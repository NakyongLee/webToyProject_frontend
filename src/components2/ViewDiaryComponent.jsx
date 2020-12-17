import React, { Component } from 'react';
import DiaryService from '../services/DiaryService';

class ViewDiaryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            diary: []
        }
    }
    
    componentDidMount() {
        DiaryService.getDiaryById(this.state.id).then( res => {
            this.setState({diary: res.data});
        })
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Diary Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Title: </label>
                            <div> { this.state.diary.title }</div>
                        </div>
                        <div className = "row">
                            <label> Date: </label>
                            <div> { this.state.diary.date }</div>
                        </div>
                        <div className = "row">
                            <label> Content: </label>
                            <div> { this.state.diary.content }</div>
                        </div>
                        <div className = "row">
                            <label> Emotion: </label>
                            <div> { this.state.diary.emotion }</div>
                        </div>
                        <div className = "row">
                            <img src={'http://localhost:8080/api/v1/diaries/image/' + this.state.id} alt = "img"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewDiaryComponent;