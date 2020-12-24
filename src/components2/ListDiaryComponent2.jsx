import React, { Component } from 'react'
import DiaryService from '../services/DiaryService'

class ListDiaryComponent2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            diaries: []
        }
        this.addDiary = this.addDiary.bind(this);
        this.editDiary = this.editDiary.bind(this);
        this.deleteDiary = this.deleteDiary.bind(this);
    }

    addDiary() {
        this.props.history.push(`/add-diary/_add`);
    }

    editDiary(id) {
        this.props.history.push(`/add-diary/${id}`);
    }

    deleteDiary(id) {
        DiaryService.deleteDiary(id).then(res => {
            this.setState({ diaries: this.state.diaries.filter(diary => diary.id !== id) });
        });
    }

    viewDiary(id) {
        this.props.history.push(`/view-diary/${id}`);
    }

    componentDidMount() {
        DiaryService.getDiaries().then((res) => {
            this.setState({ diaries: res.data });
        });
    }

    getEmotion(emotion) {
        if (emotion === '행복') {
            return <div className="card-header">🥰</div>
        }
        else if (emotion === '보통') {
            return <div className="card-header">🙂</div>
        }
        else if (emotion === '슬픔') {
            return <div className="card-header">😢</div>
        }
        else if (emotion === '화남') {
            return <div className="card-header">😡</div>
        }
        else if (emotion === '걱정') {
            return <div className="card-header">🥺</div>
        }
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Diary List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addDiary}> Add Diary</button>
                </div>
                <br></br>
                <div className="row">
                    {
                        this.state.diaries.map(
                            diary =>
                                <div className="col-sm-4">
                                    <div className="card border-dark mb-3" style={{ marginLeft: "10px" }}>
                                        {/* <div className="card-header">{diary.emotion}</div> */}
                                        {this.getEmotion(diary.emotion)}
                                        <div className="card-body">
                                            <h5 className="card-title">{diary.title}</h5>
                                            <p className="card-text">{diary.content}</p>
                                            <p className="card-text"><small className="text-muted">{diary.date}</small></p>

                                            <div className="btn-group" role="group">
                                                {/* <button onClick={ () => this.editDiary(diary.id)} className="btn btn-info">Update </button>
                                        <button onClick={ () => this.deleteDiary(diary.id)} className="btn btn-danger">Delete </button> */}
                                                <button onClick={() => this.viewDiary(diary.id)} className="btn btn-info">View </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        )
                    }
                </div>
            </div>
        )
    }
}


export default ListDiaryComponent2