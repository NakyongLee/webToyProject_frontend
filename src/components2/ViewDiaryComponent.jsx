import React, { Component } from 'react';
import DiaryService from '../services/DiaryService';

class ViewDiaryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            diary: [],
            loading: false
        }

        this.editDiary = this.editDiary.bind(this);
        this.deleteDiary = this.deleteDiary.bind(this);
    }

    handleOnLoad = () => {
        this.setState({
            loading: false
        })
    }

    componentDidMount() {
        DiaryService.getDiaryById(this.state.id).then(res => {
            this.setState({ diary: res.data });
        })
        this.setState({ loading: true })
    }

    editDiary(id) {
        this.props.history.push(`/add-diary/${id}`);
    }

    deleteDiary(id) {
        DiaryService.deleteDiary(id).then(res => {
            this.props.history.push('/diaries');
        });
    }

    diaryList() {
        this.props.history.push('/diaries');
    }

    getImage() {
        if (this.state.diary.img_name === null && this.state.loading === true) {
            return
        }
        else {
            return <img className="card-img-botton" src={'http://localhost:8080/api/v1/diaries/image/' + this.state.id} alt="img" width="100%" height="auto" onLoad={this.handleOnLoad} />

        }

    }

    getEmotion() {
        if (this.state.diary.emotion === '행복') {
            return <div className="card-header">🥰</div>
        }
        else if (this.state.diary.emotion === '보통') {
            return <div className="card-header">🙂</div>
        }
        else if (this.state.diary.emotion === '슬픔') {
            return <div className="card-header">😢</div>
        }
        else if (this.state.diary.emotion === '화남') {
            return <div className="card-header">😡</div>
        }
        else if (this.state.diary.emotion === '불안') {
            return <div className="card-header">🥺</div>
        }
    }

    render() {
        let img = null;
        // if (this.state.file !== '') {
        //     profile_preview = <img className="profile_preview" src={this.state.previewURL} alt="img" width="100%" height="auto"></img>
        // }
        if (this.state.loading === true) {
            img = <img className="card-img-botton" src={'http://localhost:8080/api/v1/diaries/image/' + this.state.id} alt="img" width="100%" height="auto" />

        }
        return (
            <div>
                <br></br>
                <div class="col-md-8 offset-md-2 offset-md-2">
                    <div className="card border-dark mb-3">
                        {this.getEmotion()}
                        <div className="card-body">
                            <h5 className="card-title">{this.state.diary.title}</h5>
                            <p className="card-text">{this.state.diary.content}</p>
                            <p className="card-text"><small className="text-muted">{this.state.diary.date}</small></p>
                        </div>
                        {/* {this.getImage()} */}
                        {this.getImage()}
                    </div>
                    <button onClick={() => this.editDiary(this.state.id)} className="btn btn-info">Update </button>
                    <button onClick={() => this.deleteDiary(this.state.id)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete </button>
                    <button onClick={() => this.diaryList()} className="btn btn-info" style={{ marginLeft: "10px" }}>Back </button>
                </div>
            </div>
        );
    }
}

export default ViewDiaryComponent;