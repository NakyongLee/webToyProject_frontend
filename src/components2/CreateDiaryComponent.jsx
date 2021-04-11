import React, { Component } from 'react';
import DiaryService from '../services/DiaryService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateDiaryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //step2
            id: this.props.match.params.id,
            title: '',
            date: '',
            content: '',
            emotion: '',
            image: undefined,
            previewURL: 'http://localhost:8080/api/v1/diaries/image/' + this.props.match.params.id,
            file: null
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.changeEmotionHandler = this.changeEmotionHandler.bind(this);
        this.saveDiary = this.saveDiary.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.handleFileOnChange = this.handleFileOnChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    //step3
    componentDidMount() {

        //step4
        if (this.state.id === '_add') {
            return
        } else {
            DiaryService.getDiaryById(this.state.id).then((res) => {
                let diary = res.data;
                this.setState({
                    title: diary.title,
                    date: new Date(diary.date),
                    content: diary.content,
                    emotion: diary.emotion,
                    file: diary.img_name,
                });
            });
        }
    }

    saveDiary = (e) => {
        e.preventDefault();
        let diary = { title: this.state.title, date: this.state.date.getFullYear() + '-' + (this.state.date.getMonth() + 1) + '-' + this.state.date.getDate(), content: this.state.content, emotion: this.state.emotion };
        console.log('diary => ' + JSON.stringify(diary))

        const formData = new FormData();
        formData.append('image', this.state.image);
        console.log('image => ' + this.state.image);

        //step5
        if (this.state.id === '_add') {

            DiaryService.createDiary(diary).then(res => {
                console.log('response' + res.data);
                if (this.state.image !== undefined) {
                    formData.append('id', res.data);
                    DiaryService.uploadImage(formData).then(res => {
                        console.log('이미지 ' + res.data);

                    });
                }
                this.props.history.push('/Diaries');
            });

        } else {
            DiaryService.updateDiary(diary, this.state.id).then(res => {
                if (this.state.image !== undefined) {
                    formData.append('id', this.state.id);
                    DiaryService.uploadImage(formData).then(res => {
                        console.log('이미지 ' + res.data);

                    });
                }
                else if (this.state.previewURL === '') {
                    console.log('preview')
                    DiaryService.deleteImage(this.state.id).then(res => {
                        ;
                    })
                }
                this.props.history.push('/Diaries');
            });
        }

    }

    deleteImage = (event) => {
        event.preventDefault();
        this.setState({ file: null, previewURL: '', image: undefined })
        console.log('f => ' + this.state.file + 'pasdf=> ' + this.state.previewURL + 'iasdf=>' + this.state.image);
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeDateHandler = (event) => {
        this.setState({ date: event })
        console.log('aa' + event.getFullYear() + '-' + (event.getMonth() + 1) + '-' + event.getDate())

    }

    changeContentHandler = (event) => {
        this.setState({ content: event.target.value });
    }

    changeEmotionHandler = (event) => {
        this.setState({ emotion: event.target.value });
    }

    changeImageHandler = (event) => {
        this.setState({ image: event.target.files[0] });
    }

    handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                previewURL: reader.result
            })
        }
        reader.readAsDataURL(file);
        this.setState({ image: event.target.files[0] });
    }

    cancle() {
        this.props.history.push('/diaries');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Diary</h3>
        }
        else {
            return <h3 className="text-center">Update Diary</h3>

        }

    }
    render() {
        let profile_preview = null;
        if (this.state.file !== null) {
            profile_preview = <div className="form-group"><img className="profile_preview" src={this.state.previewURL} alt="img" width="100%" height="auto"></img></div>
        }

        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <lable> Title </lable>
                                        <input placeholder="Title" name="title" className="form-control"
                                            value={this.state.title} onChange={this.changeTitleHandler} />
                                    </div>
                                    <div className="form-group">
                                        <lable> Date </lable>
                                        {/* <input placeholder="Date" name="date" className="form-control"
                                            value={this.state.date} onChange={this.changeDateHandler}/> */}
                                        <DatePicker
                                            dateFormat="yyyy-MM-dd"
                                            selected={this.state.date}
                                            onChange={this.changeDateHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <lable> Content: </lable>
                                        <textarea placeholder="Content" name="content" className="form-control"
                                            value={this.state.content} onChange={this.changeContentHandler}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <lable> Emotion: </lable>
                                        <select className="form-control" name="emotion" value={this.state.emotion}
                                            onChange={this.changeEmotionHandler} >
                                            <option value=""></option>
                                            <option value="행복">🥰행복</option>
                                            <option value="보통">🙂보통</option>
                                            <option value="슬픔">😢슬픔</option>
                                            <option value="화남">😡화남</option>
                                            <option value="불안">🥺불안</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            감정을 선택하세요
                                            </div></div>

                                    <div className="form-group"><lable> Image: </lable></div>
                                    <div className="form-row">

                                        <div className="custom-file form-group col-md-9">

                                            <input name="image" className="custom-file-input" type="file"
                                                onChange={this.handleFileOnChange} />
                                            <label className="custom-file-label">Choose file</label>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <button onClick={this.deleteImage} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete </button>
                                        </div>
                                        {profile_preview}

                                    </div>
                                    <button className="btn btn-success" onClick={this.saveDiary}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancle.bind(this)} style={{ marginLeft: "10px" }}>Cancle</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateDiaryComponent;