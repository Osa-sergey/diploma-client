import React, {useContext, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import ModalWindow from "./components/Modal/ModalWindow";
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite"

function App() {
    const [loginModal, setLoginModal] = useState(false)
    const {store} = useContext(Context)

    if (!store.isAuth) {
        return (
            <ModalWindow visible={true} setVisible={setLoginModal}>
                <LoginForm setModalVisible={setLoginModal}/>
            </ModalWindow>
        )
    }

    return (
        <div className="app">
            <ModalWindow visible={loginModal} setVisible={setLoginModal}>
                <LoginForm setModalVisible={setLoginModal}/>
            </ModalWindow>
            <PostList/>
            <button className="logout_button" onClick={() => store.logout()}>logout</button>
            {
                store.tmpPost.id === -1
                    ? <div className="viewer">
                        <div className="viewer_hint">Создайте оптимизацию (add post)</div>
                    </div>
                    :   store.tmpPost.status === 'IN_PROCESS'
                        ? <div className="viewer">
                            <div className="viewer_hint">Обновите список (update) и дождитесь конца оптимизации</div>
                          </div>
                        : <div className="viewer">
                            <div className="viewer_hint">Скопируйте и поместите в файл карты</div>
                            <div className="viewer_content">Результаты оптимизации</div>
                        </div>
            }
        </div>
    );
}

export default observer(App);
