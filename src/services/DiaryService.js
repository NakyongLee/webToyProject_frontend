import axios from 'axios';

const DIARY_API_BASE_URL = "http://localhost:8080/api/v1/diaries";

class DiaryService {

    getDiaries(){
        return axios.get(DIARY_API_BASE_URL);
    }

    createDiary(diary){
        return axios.post(DIARY_API_BASE_URL, diary);
    }

    getDiaryById(diaryId){
        return axios.get(DIARY_API_BASE_URL + '/' + diaryId);
    }

    updateDiary(diary, diaryId){
        return axios.put(DIARY_API_BASE_URL + '/' + diaryId, diary);
    }

    deleteDiary(diaryId){
        return axios.delete(DIARY_API_BASE_URL + '/' + diaryId);
    }

    uploadImage(data) {
        return axios.post(DIARY_API_BASE_URL + '/image', data);
    }

    updateImage(data){
        return axios.put(DIARY_API_BASE_URL + '/update/image', data);
    }
    
}

export default new DiaryService()